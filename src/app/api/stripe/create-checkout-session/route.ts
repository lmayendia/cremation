import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { cookies } from 'next/headers';
import { User, CreateCheckoutSessionRequestBody, CreateCheckoutSessionResponse, CreateCheckoutSessionErrorResponse } from '@/types';
import { queryUser } from '@/lib/strapi';

// Initialize Stripe with your secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(request: Request): Promise<Response> {
  try {
    // Access the JWT token from cookies
    const cookieStore = cookies();
    const token = cookieStore.get('jwt')?.value;

    // If no token is found, redirect to /login page
    if (!token) {
      return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/sign-in`);
    }

    // Fetch basic user data from Strapi
    const user = await queryUser<User>('users/me?populate=*', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    // If user is not found, redirect to /login page
    if (!user || !user.id) {
      return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/sign-in`);
    }   

    // Extract the stripe_customer_id
    const stripeCustomerId = user.stripe_customer.stripe_customer_id;

    // Retrieve the price ID and mode from the request body
    const requestBody: CreateCheckoutSessionRequestBody = await request.json();
    const { priceId, mode = 'subscription' } = requestBody;

    // If priceId is missing, return a 400 Bad Request response
    if (!priceId) {
      const response: CreateCheckoutSessionErrorResponse = {
        data: null,
        error: 'Price ID is required',
      };
      return NextResponse.json(response, { status: 400 });
    }

    // Determine the Stripe checkout mode
    const checkoutMode = mode === 'payment' ? 'payment' : 'subscription';

    // Create the Checkout Session with the appropriate mode
    const session: Stripe.Checkout.Session = await stripe.checkout.sessions.create({
      mode: checkoutMode,
      customer: stripeCustomerId,
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      ui_mode: 'embedded',
      return_url: `${process.env.NEXT_PUBLIC_BASE_URL}/subscription/success?session_id={CHECKOUT_SESSION_ID}`,
    });

    // Ensure client_secret is not null
    if (!session.client_secret) {
      // You can return an error response or throw an error
      const response: CreateCheckoutSessionErrorResponse = {
        data: null,
        error: 'Failed to create Checkout Session: client_secret is missing',
      };
      return NextResponse.json(response, { status: 500 });
    }

        
    // Prepare the successful response with the session ID
    const response: CreateCheckoutSessionResponse = {
      client_secret: session.client_secret,
    };

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    // Log the error for debugging purposes
    console.error(
      'Error creating Checkout Session:',
      error instanceof Error ? error.message : error
    );

    // Determine the error message
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';

    // Prepare the error response
    const response: CreateCheckoutSessionErrorResponse = {
      data: null,
      error: errorMessage,
    };

    return NextResponse.json(response, { status: 500 });
  }
}
