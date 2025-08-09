import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Define the paths that require authentication
const protectedRoutes = ['/profile', '/subscription'];

// Define the paths that should redirect authenticated users away (auth pages)
const authRoutes = ['/sign-in', '/sign-up', '/reset-password'];

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // ===== Handle Country Detection via Header =====
  // Retrieve the country code from Vercel's geolocation header, defaulting to 'US'
  let country = req.headers.get('x-vercel-ip-country') || 'PR';

  // If the country isn't 'PR' or 'US', default to 'PR'
  if (country !== 'PR' && country !== 'US') {
    country = 'PR';
  }

  // Add the country to the request headers (so it's accessible on the client/server)
  const response = NextResponse.next();
  response.headers.set('x-user-country', country);

  // ===== Handle Authentication Logic =====
  const token = req.cookies.get('jwt')?.value;
  const isProtected = protectedRoutes.some((path) => pathname.startsWith(path));
  const isAuthRoute = authRoutes.some((path) => pathname.startsWith(path));

  // If the route is protected and user has no token, redirect to login
  if (isProtected && !token) {
    const url = req.nextUrl.clone();
    url.pathname = '/sign-in';
    return NextResponse.redirect(url);
  }

  // If user is authenticated and trying to access auth pages, redirect to profile
  if (isAuthRoute && token) {
    const url = req.nextUrl.clone();
    url.pathname = '/profile';
    return NextResponse.redirect(url);
  }

  // Continue to the next middleware or request handler
  return response;
}

// Apply middleware to all paths
export const config = {
  matcher: '/:path*',
};