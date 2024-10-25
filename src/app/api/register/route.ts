// app/api/register/route.ts
import { NextResponse } from 'next/server';
import { queryUser } from '@/lib/strapi';
import { FailureResponse, User, RegistrationResponse } from '@/types';

export async function POST(req: Request): Promise<Response> {
  const { email, password, username } = await req.json();

  try {
    // Check if the user already exists by email
    const existingUsersByEmail: User[] = await queryUser<User[]>(
      `users?filters[email][$eq]=${encodeURIComponent(email)}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.BACKEND_API_KEY}`,
        },
      }
    );

    // Check if the user already exists by username
    const existingUsersByUsername: User[] = await queryUser<User[]>(
      `users?filters[username][$eq]=${encodeURIComponent(username)}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.BACKEND_API_KEY}`,
        },
      }
    );

    // Return error if user already exists
    if (existingUsersByEmail.length > 0 || existingUsersByUsername.length > 0) {
      console.log('User already exists');
      const response: FailureResponse = {
        data: null,
        error: {
          status: 400,
          name: 'ApplicationError',
          message: 'Email or Username are already taken',
          details: {},
        },
      };
      return NextResponse.json(response, { status: 400 });
    }

    // Register the new user
    const registrationData: RegistrationResponse = await queryUser<RegistrationResponse>(
      'auth/local/register',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
          username,
        }),
      }
    );

    // After registration, set the JWT in HTTP-only cookie
    const response = NextResponse.json(
      {
        data: registrationData.user,
        error: null,
      },
      { status: 200 }
    );

    // Set the JWT as an HTTP-only cookie
    response.cookies.set('jwt', registrationData.jwt, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 1 week
    });

    return response;
  } catch (error) {
    // Ensure the error is handled as an object and narrowed down
    if (error instanceof Error) {
      console.error('Error during registration:', error.message);

      // Return error response
      const response: FailureResponse = {
        data: null,
        error: {
          status: 500,
          name: 'ServerError',
          message: error.message || 'Internal server error',
          details: {},
        },
      };
      return NextResponse.json(response, { status: 500 });
    }

    // Fallback for non-standard errors
    return NextResponse.json(
      {
        data: null,
        error: {
          status: 500,
          name: 'UnknownError',
          message: 'An unknown error occurred',
          details: {},
        },
      },
      { status: 500 }
    );
  }
}
