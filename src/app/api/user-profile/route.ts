import { cookies } from 'next/headers'; // Import 'cookies' from 'next/headers'
import { query, queryUser } from '@/lib/strapi';
import { UserProfileResponse, User, FilteredUserData } from '@/types';
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
    const filteredUserData: FilteredUserData = {
      nombre: user_details.nombre,
      email: user_details.email,
      subscriptions: user_details.subscriptions.map((sub: any) => ({
        id: sub.id,
        plan_name: sub.plan_name,
        amount_of_cycles: sub.amount_of_cycles,
        amount_paid_cycles: sub.amount_paid_cycles,
        amount_paid: parseFloat(sub.amount_paid),
        total_amount_to_pay: parseFloat(sub.total_amount_to_pay),
        amount_due: parseFloat(sub.amount_due),
        starting_date: sub.starting_date,
        next_payment_date: sub.next_payment_date,
        monthly_payment: parseFloat(sub.monthly_payment) || 0
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
