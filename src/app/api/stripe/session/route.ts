import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { cookies } from 'next/headers';
import { query, queryUser, strapiPostRequest } from '@/lib/strapi';
import { SubscriptionData, User } from '@/types';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function GET(request: Request): Promise<Response> {
  // Extract JWT token from cookies
  const cookieStore = cookies();
  const token = cookieStore.get('jwt')?.value;

  if (!token) {
    console.error('Unauthorized access attempt: No JWT token found in cookies.');
    return NextResponse.json({ error: 'Unauthorized. Please log in.' }, { status: 401 });
  }

  // Fetch user data from Strapi, including the stripe_customer relation
  const user = await queryUser<User>('users/me', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  if (!user || !user.id) {
    console.error('User not found or ID missing.', { user });
    return NextResponse.json({ error: 'User not found or ID missing.' }, { status: 400 });
  }

  const fullUser = await query(`users/${user.id}?populate=stripe_customer`);

  if (!fullUser.stripe_customer || !fullUser.stripe_customer.id) {
    console.error('Stripe customer not found for user.', { user });
    return NextResponse.json({ error: 'Stripe customer not found for user.' }, { status: 400 });
  }

  const userId = user.id;
  const stripeCustomerStrapiId = fullUser.stripe_customer.id;

  const url = new URL(request.url);
  const sessionId = url.searchParams.get('sessionId');

  if (!sessionId) {
    console.error('Session ID is required but missing in request URL.', { url: request.url });
    return NextResponse.json({ error: 'Session ID is required.' }, { status: 400 });
  }

  try {
    // Retrieve the Checkout Session from Stripe
    const session: Stripe.Checkout.Session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ['subscription', 'customer'],
    });

    if (session.payment_status !== 'paid') {
      console.error('Payment not completed.', { payment_status: session.payment_status });
      return NextResponse.json({ error: 'Payment not completed.' }, { status: 400 });
    }

    if (session.amount_total === null) {
      console.error('Amount total is missing from session data.', { session });
      return NextResponse.json({ error: 'Amount total is missing from session data.' }, { status: 400 });
    }

    // Check if this is a subscription or one-time payment
    const isSubscription = session.mode === 'subscription';
    
    let price: Stripe.Price;
    let productId: string;

    if (isSubscription) {
      // Extract subscription and plan details
      const subscription = session.subscription as Stripe.Subscription;
      console.log('Subscription:', subscription);

      if (!subscription) {
        console.error('Subscription is missing from session data.', { session });
        return NextResponse.json({ error: 'Subscription is missing from session data.' }, { status: 400 });
      }

      price = subscription.items.data[0].price as Stripe.Price;
    } else {
      // For one-time payments, extract price from line_items
      const lineItems = await stripe.checkout.sessions.listLineItems(sessionId);
      if (!lineItems.data.length) {
        console.error('No line items found for one-time payment session.', { session });
        return NextResponse.json({ error: 'No line items found for one-time payment session.' }, { status: 400 });
      }
      
      price = lineItems.data[0].price as Stripe.Price;
    }

    // Get the product ID from the price object
    productId = price.product as string;

    if (!productId) {
      console.error('Product ID is missing from price object.', { price });
      return NextResponse.json({ error: 'Product ID is missing from price object.' }, { status: 400 });
    }

    // Fetch the product details from Stripe
    const product = await stripe.products.retrieve(productId);

    if (!product.name) {
      console.error('Product name is missing.', { product });
      return NextResponse.json({ error: 'Product name is missing.' }, { status: 400 });
    }

    const productName = product.name; // e.g., "Plan 24 meses USA"

    let monthlyPayment: number;
    let totalAmountToPay: number;
    let amountPaid: number;
    let amountDue: number;
    let startingDate: Date;
    let nextPaymentDate: Date;

    if (isSubscription) {
      const subscription = session.subscription as Stripe.Subscription;
      
      monthlyPayment = session.amount_total! / 100;
      // For the first subscription cycle, we'll calculate based on the amount paid
      totalAmountToPay = monthlyPayment; // Initial amount - external function will update as cycles progress
      amountPaid = monthlyPayment; // First payment completed
      amountDue = 0; // No amount due after first payment
      startingDate = new Date(subscription.current_period_start * 1000);
      nextPaymentDate = new Date(subscription.current_period_end * 1000);
    } else {
      // For one-time payments
      monthlyPayment = session.amount_total! / 100;
      totalAmountToPay = monthlyPayment;
      amountPaid = totalAmountToPay;
      amountDue = 0; // Fully paid
      startingDate = new Date(session.created * 1000);
      nextPaymentDate = startingDate; // No next payment for one-time
    }

    const formatDateToYYYYMMDD = (date: Date): string => {
      return date.toISOString().split('T')[0]; // Converts to "YYYY-MM-DD"
    };

    const subscriptionData: SubscriptionData = {
      plan_name: productName,
      amount_of_cycles: 1, // Default to 1 as requested - external function will modify as payments are made
      amount_paid_cycles: 1, // First payment completed
      amount_paid: parseFloat(amountPaid.toFixed(2)), // Keep as decimal for Strapi
      monthly_payment: parseFloat(monthlyPayment.toFixed(2)), // Keep as decimal for Strapi
      total_amount_to_pay: parseFloat(totalAmountToPay.toFixed(2)), // Keep as decimal for Strapi
      amount_due: parseFloat(amountDue.toFixed(2)), // Keep as decimal for Strapi
      starting_date: formatDateToYYYYMMDD(startingDate),
      next_payment_date: formatDateToYYYYMMDD(nextPaymentDate),
      session_id: sessionId,
      users_permissions_user: userId,
      stripe_customer: stripeCustomerStrapiId,
    };
    
    console.log('Subscription data to save:', JSON.stringify(subscriptionData, null, 2));
    
    // Save subscription data to Strapi
    const response = await strapiPostRequest<SubscriptionData>('subscriptions', subscriptionData);
    console.log('Strapi Response:', response);

    if (!response) {
      console.error('Error updating CMS. No response received from Strapi.');
      return NextResponse.json({ error: 'Error updating CMS' }, { status: 500 });
    }

    return NextResponse.json({ 
      message: 'Subscription data saved successfully.',
      subscriptionId: (response as any)?.data?.id || null 
    }, { status: 200 });
  } catch (error: unknown) {
    console.error('Error processing session data:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
