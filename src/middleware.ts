import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  // Check if the user-country cookie already exists
  const countryCookie = req.cookies.get('user-country');
  
  // If the cookie exists, skip the API call and proceed
  if (countryCookie) {
    return NextResponse.next(); // Continue with the request
  }

  // Retrieve the user's IP address from x-forwarded-for or fallback for local testing
  const forwarded = req.headers.get('x-forwarded-for');
  const ip = forwarded ? forwarded.split(',')[0] : '134.201.250.154'; // Default IP for testing
  // Define the base URL (fallback to environment variable or localhost)
  const baseUrl = req.nextUrl.origin || process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

  // Call your custom API route to get the country code
  const response = await fetch(`${baseUrl}/api/ip-lookup`, {
    headers: {
      'x-forwarded-for': ip
    }
  });

  // Check if the API call was successful and extract country data
  if (response.ok) {
    const data = await response.json();
    const country = data.country_code || 'US'; // Fallback to US if not found

    // Create a response and set the country in a cookie
    const res = NextResponse.next();
    res.cookies.set('user-country', country, { httpOnly: false, maxAge: 60 * 60 * 24 * 30 }); // 30-day cookie

    return res;
  }

  // In case of error, fallback to US and proceed
  const res = NextResponse.next();
  res.cookies.set('user-country', 'US', { httpOnly: false, maxAge: 60 * 60 * 24 * 30 });
  return res;
}

// Apply middleware to specific paths (optional)
export const config = {
  matcher: ['/'], // Apply to root path, but can be adjusted for specific routes
};
