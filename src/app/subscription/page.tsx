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
  const [error, setError] = useState<string | null>(null);
  
  const searchParams = useSearchParams();
  const priceId = searchParams.get('priceId');
  const router = useRouter();
  const pathname = usePathname();

  const fetchClientSecret = useCallback(async () => {
    if (!priceId) {
      setError('Price ID is required');
      return null;
    }

    try {
      const response = await fetch('/api/stripe/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ priceId }),
      });

      if (response.redirected || response.status === 401 || response.status === 403) {
        // Redirect to login with the current path and query parameters as the 'redirect' parameter
        const redirectUrl = `${pathname}?${searchParams.toString()}`;
        router.push(`${process.env.NEXT_PUBLIC_BASE_URL}/sign-in?redirect=${encodeURIComponent(redirectUrl)}`);
        return null;
      }

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.error || 'An error occurred');
        return null;
      }

      const data = await response.json();
      const { client_secret } = data;

      if (!client_secret) {
        setError('Client secret is missing from the response');
        return null;
      }

      return client_secret;
    } catch (error) {
      setError('Failed to fetch client secret');
      return null;
    }
  }, [priceId, pathname, searchParams, router]);

  // Fetch the client secret when the component mounts
  useEffect(() => {
    fetchClientSecret().then(secret => setClientSecret(secret));
  }, [fetchClientSecret]);

  // If an error occurred, display it to the user
  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

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
        <p>Loading checkout...</p> // Fallback while waiting for client secret
      )}
    </div>
  );
};

export default NewSubscriptionPage;
