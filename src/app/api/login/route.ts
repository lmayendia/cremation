// app/api/login/route.ts

import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { identifier, password } = await req.json();

  try {
    // Send login request to Strapi's /auth/local endpoint
    const res = await fetch(`${process.env.BACKEND_URL}/api/auth/local`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        identifier, // username or email
        password,
      }),
    });

    const data = await res.json();
    if (!res.ok) {
      console.log(data)
      // Handle errors, e.g., invalid credentials
      return NextResponse.json(
        { error: data.message || 'No se pudo iniciar sesion, verifica tus credenciales' },
        { status: res.status }
      );
    }

    // Extract JWT from the response
    const { jwt } = data;

    // Create a response and set the JWT as an HTTP-only cookie
    const response = NextResponse.json({ message: 'Inicio de sesión exitoso' });
    response.cookies.set('jwt', jwt, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // Ensure cookies are only sent over HTTPS in production
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: '/', // Make the cookie available to the entire site
      sameSite: 'strict', // Helps protect against CSRF attacks
    });

    return response;
  } catch (error) {
    console.error('Error during login:', error);
    return NextResponse.json(
      { error: 'An error occurred during login. Please try again.' },
      { status: 500 }
    );
  }
}
