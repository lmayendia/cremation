'use client';

import React, { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { CheckoutSession } from '@/types'; // Ensure this type is defined as shown below

const SuccessPage: React.FC = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const sessionId = searchParams.get('session_id');

  const [session, setSession] = useState<CheckoutSession | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchSession = async () => {
      // Redirect if there's no sessionId in URL
      if (!sessionId) {
        router.push('/'); // Redirect to home
        return;
      }

      try {
        const response = await fetch(`/api/stripe/session?sessionId=${sessionId}`, {
          method: 'GET',
        });

        // If response is not ok, assume invalid session and redirect
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Invalid or expired session ID.');
        }

        // Fetch session data
        const data: CheckoutSession = await response.json();

        // Verify the session object has required fields, otherwise handle as invalid
        if (!data.id || !data.customer_email) {
          throw new Error('Invalid session details received.');
        }

        // Set session data if valid
        setSession(data);
      } catch (error: unknown) {
        // Redirect user to home on error
        router.push('/');
      } finally {
        setLoading(false);
      }
    };

    fetchSession();
  }, [sessionId, router]);

  if (loading) {
    return <p>Loading subscription details...</p>;
  }

  if (session) {
    return (
      <div className='p-32'>
        <h1>Subscription Successful!</h1>
        <p>Thank you for your purchase, {session.customer_email}.</p>
        <p>Your subscription status is: {session.status}</p>
        {/* Add more details or navigation options as needed */}
      </div>
    );
  }

  return null;
};

export default SuccessPage;
