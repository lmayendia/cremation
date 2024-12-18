import { NextResponse } from 'next/server';
import { queryUser } from '@/lib/strapi';
import { FailureResponse, User, RegistrationResponse } from '@/types';

export async function POST(req: Request): Promise<Response> {
  const { email, password, firstName, lastName } = await req.json();

  // Concatenate `firstName` and `lastName` to create `nombre`
  const nombre = `${firstName} ${lastName}`;
  
  // Generate a unique `username` based on `firstName` and `lastName`
  const username = `${firstName} ${lastName} ${Math.floor(1000 + Math.random() * 9000)}`;

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

    // Return error if user already exists
    if (existingUsersByEmail.length > 0) {
      const response: FailureResponse = {
        data: null,
        error: {
          status: 400,
          name: 'ApplicationError',
          message: 'Email is already taken',
          details: {},
        },
      };
      return NextResponse.json(response, { status: 400 });
    }

    // Register the new user without `nombre`
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
          username
        }),
      }
    );

    // Extract user ID from registration response
    const userId = registrationData.user?.id;

    if (userId) {
      // Update the newly created user with `nombre`
      await queryUser(
        `users/${userId}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${process.env.STRAPI_MASTER_KEY}`,
          },
          body: JSON.stringify({
            nombre
          }),
        }
      );
    }

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
    // Error handling
    if (error instanceof Error) {
      console.error('Error during registration:', error.message);

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
