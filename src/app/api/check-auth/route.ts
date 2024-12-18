// app/api/check-auth/route.ts

import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET(): Promise<Response> {
  try {
    // Access cookies using Next.js's cookies utility
    const cookieStore = cookies();
    const jwtToken = cookieStore.get('jwt')?.value;

    if (jwtToken) {
      return NextResponse.json({ authenticated: true });
    }
    return NextResponse.json({ authenticated: false });
  } catch (error) {
    console.error('Error checking authentication:', error);
    return NextResponse.json({ authenticated: false });
  }
}
