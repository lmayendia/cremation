import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Define the paths that require authentication
const protectedRoutes = ['/profile'];

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // ===== Handle Country Detection via Header =====
  // Retrieve the country code from Vercel's geolocation header, defaulting to 'US'
  let country = req.headers.get('x-vercel-ip-country') || 'PR';

  // If the country isn't 'PR' or 'US', default to 'US'
  if (country !== 'PR' && country !== 'US') {
    country = 'PR';
  }

  // Add the country to the request headers (so it's accessible on the client/server)
  const response = NextResponse.next();
  response.headers.set('x-user-country', country);

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
  }

  // Continue to the next middleware or request handler
  return response;
}

// Apply middleware to all paths
export const config = {
  matcher: '/:path*',
};