// app/api/user-profile/route.ts

import { cookies } from 'next/headers'; // Import 'cookies' from 'next/headers'
import { queryUser } from '@/lib/strapi';
import { UserProfileResponse, User } from '@/types';
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
    const user: User = await queryUser<User>('users/me', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    const response: UserProfileResponse = {
      data: user,
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
