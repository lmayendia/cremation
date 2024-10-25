// app/api/logout/route.ts

import { NextResponse } from 'next/server';

export async function POST(): Promise<Response> {
  // Create a response indicating successful logout
  const response = NextResponse.json({ message: 'Logged out successfully.' }, { status: 200 });

  // Clear the JWT cookie by setting it to an empty value and expiring it immediately
  response.cookies.set('jwt', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    expires: new Date(0), // Expire the cookie immediately
  });

  return response;
}
