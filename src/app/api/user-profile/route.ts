import { cookies } from 'next/headers'; // Import 'cookies' from 'next/headers'
import { query, queryUser } from '@/lib/strapi';
import { UserProfileResponse, User, FilteredUserData, SubscriptionData } from '@/types';
import { NextResponse } from 'next/server';
// Removed unused import of jwt since it's not being used

export async function GET(): Promise<Response> {
  try {
    // Access cookies using Next.js's cookies utility
    const cookieStore = cookies();
    const token = cookieStore.get('jwt')?.value;

    if (!token) {
      const response: UserProfileResponse = {
        data: null,
        error: 'Not authenticated. Please log in.',
      };
      return NextResponse.json(response, { status: 401 });
    }

    // Fetch user data from Strapi's "users/me" endpoint
    const user: User = await queryUser<User>('users/me?populate=*', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });


    const user_details: User = await query(`users/${user.id}?populate=*`)

    // Filter the data to match only the required fields for the frontend
    // Directly assert the type of `user_details.subscriptions`

    // Map BackendSubscription to SubscriptionData
    const filteredUserData: FilteredUserData = {
      nombre: user_details.nombre,
      email: user_details.email,
      subscriptions: user_details.subscriptions.map((sub): SubscriptionData => ({
        id: sub.id,
        plan_name: sub.plan_name,
        amount_of_cycles: sub.amount_of_cycles,
        amount_paid_cycles: sub.amount_paid_cycles,
        amount_paid: sub.amount_paid, // Convert from string to number
        total_amount_to_pay: sub.total_amount_to_pay, // Convert from string to number
        amount_due: sub.amount_due, // Convert from string to number
        starting_date: sub.starting_date,
        next_payment_date: sub.next_payment_date,
        monthly_payment: sub.monthly_payment || 0, // Convert from string to number
        session_id: sub.session_id,
        users_permissions_user: sub.users_permissions_user,
        stripe_customer: sub.stripe_customer,
      })),
    };




    const response: UserProfileResponse = {
      data: filteredUserData,
      error: null,
    };
    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error('Error fetching user profile:', error);

    let errorMessage = 'Failed to fetch user profile.';

    if (error instanceof Error) {
      errorMessage = error.message;
    }

    const response: UserProfileResponse = {
      data: null,
      error: errorMessage,
    };

    return NextResponse.json(response, { status: 500 });
  }
}
