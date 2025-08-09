// app/api/check-auth/route.ts

import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET(): Promise<Response> {
  try {
    // Access cookies using Next.js's cookies utility
    const cookieStore = cookies();
    const jwtToken = cookieStore.get('jwt')?.value;
    const isLoggedInCookie = cookieStore.get('isLoggedIn')?.value;

    if (jwtToken) {
      const response = NextResponse.json({ authenticated: true });
      
      // If JWT exists but isLoggedIn cookie is missing, set it
      if (!isLoggedInCookie) {
        response.cookies.set('isLoggedIn', 'true', {
          httpOnly: false,
          secure: process.env.NODE_ENV === 'production',
          maxAge: 60 * 60 * 24 * 7, // 1 week
          path: '/',
          sameSite: 'strict',
        });
      }
      
      return response;
    }
    
    return NextResponse.json({ authenticated: false });
  } catch (error) {
    console.error('Error checking authentication:', error);
    return NextResponse.json({ authenticated: false });
  }
}
