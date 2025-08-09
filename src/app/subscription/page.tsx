'use client';

import React, { useCallback, useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout,
} from '@stripe/react-stripe-js';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

const NewSubscriptionPage: React.FC = () => {
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  
  const searchParams = useSearchParams();
  const priceId = searchParams.get('priceId');
  const mode = searchParams.get('mode') || 'subscription'; // Default to subscription if not specified
  const router = useRouter();
  const pathname = usePathname();

  const fetchClientSecret = useCallback(async () => {
    if (!priceId) {
      return null;
    }

    try {
      const response = await fetch('/api/stripe/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ priceId, mode }),
      });

      if (response.redirected || response.status === 401 || response.status === 403 || response.status === 307) {
        // Redirect to login with the current path and query parameters as the 'redirect' parameter
        const redirectUrl = `${pathname}?${searchParams.toString()}`;
        router.push(`/sign-in?redirect=${encodeURIComponent(redirectUrl)}`);
        return null;
      }

      if (!response.ok) {
        // Navigate to /sign-in if the response is not OK
        console.log('Response not OK:', response.status, response.statusText);
        router.push(`/sign-in`);
        return null;
      }

      const data = await response.json();
      const { client_secret } = data;

      if (!client_secret) {
        // Navigate to /sign-in if client secret is missing
        router.push(`/sign-in`);
        return null;
      }

      return client_secret;
    } catch (error) {
      // Navigate to /sign-in if an error occurs
      console.error('Error fetching client secret:', error);
      router.push(`/sign-in`);
      return null;
    }
  }, [priceId, pathname, searchParams, router, mode]);

  // Fetch the client secret when the component mounts
  useEffect(() => {
    fetchClientSecret().then(secret => setClientSecret(secret));
  }, [fetchClientSecret]);


  if (!priceId) {
    return <p>Error: Price ID is missing from the URL.</p>;
  }

  return (
    <div className='p-32'>
      {clientSecret ? (
        <EmbeddedCheckoutProvider
          stripe={stripePromise}
          options={{ clientSecret }}
        >
          <EmbeddedCheckout />
        </EmbeddedCheckoutProvider>
      ) : (
      <div className="overlay">
        <div className="loader"></div>
      </div>
      )}
    </div>
  );
};

export default NewSubscriptionPage;
