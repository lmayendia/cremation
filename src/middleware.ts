// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Define the paths that require authentication
const protectedRoutes = ['/profile'];

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // ===== Handle user-country cookie =====
  // Check if the 'user-country' cookie already exists
  const countryCookie = req.cookies.get('user-country');

  if (!countryCookie) {
    // Retrieve the country code from Vercel's geolocation header, defaulting to 'US'
    let country = req.headers.get('x-vercel-ip-country') || 'US';
  
    // If the country isn't 'PR' or 'US', default to 'US'
    if (country !== 'PR' && country !== 'US') {
      country = 'US';
    }
  
    const response = NextResponse.next();
    response.cookies.set('user-country', country, {
      httpOnly: false, // Accessible via JavaScript
      secure: process.env.NODE_ENV === 'production', // Secure cookies in production
      path: '/', // Valid for all routes
      maxAge: 60 * 60 * 24 * 30, // 30 days
      sameSite: 'lax', // Mitigate CSRF
    });
  
    return response;
  }

  // ===== Handle Authentication for Protected Routes =====
  const isProtected = protectedRoutes.some((path) => pathname.startsWith(path));

  // If the route is protected, check for JWT in the cookies
  if (isProtected) {
    const token = req.cookies.get('jwt')?.value;

    // If no token, redirect to the login page
    if (!token) {
      const url = req.nextUrl.clone();
      url.pathname = '/sign-in';
      return NextResponse.redirect(url);
    }

    // Optionally, you can add additional validation logic for the JWT if needed.
    // For now, we are simply checking for the presence of the token and letting Strapi handle the verification.
  }

  // Continue to the next middleware or request handler if everything is okay
  return NextResponse.next();
}

// Apply middleware to all paths
export const config = {
  matcher: '/:path*',
};
