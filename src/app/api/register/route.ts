import { NextResponse } from 'next/server';
import { queryUser } from '@/lib/strapi';
import { FailureResponse, User, RegistrationResponse } from '@/types';

export async function POST(req: Request): Promise<Response> {
  const { email, password, firstName, lastName, birth_date } = await req.json();

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
          Authorization: `Bearer ${process.env.STRAPI_MASTER_KEY}`,
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

    // Register the new user without `nombre` and `birth_date`
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
          username: `${firstName} ${lastName} ${Math.floor(1000 + Math.random() * 9000)}`,
          firstName,
          lastName,
          birth_date
        }),
      }
    );
    console.log(registrationData);
    // Extract user ID from registration response
    const userId = registrationData.user?.id;

    if (userId) {
      // Update the newly created user with `nombre` and `birth_date`
      await queryUser(
        `users/${userId}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${process.env.STRAPI_MASTER_KEY}`,
          },
          body: JSON.stringify({
            nombre,
            birth_date
          }),
        }
      );
    }

    // After registration, return success without setting JWT cookie
    const response = NextResponse.json(
      {
        data: registrationData.user,
        error: null,
      },
      { status: 200 }
    );

    return response;
  } catch (error) {
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