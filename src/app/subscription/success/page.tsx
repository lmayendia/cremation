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

        // Parse response - it's now a success message, not session data
        const data = await response.json();
        
        // Check if subscription was saved successfully
        if (data.message !== 'Subscription data saved successfully.') {
          throw new Error('Subscription was not saved properly.');
        }
        
        console.log('Subscription saved with ID:', data.subscriptionId);

        // Fetch user profile to get email for display
        const userResponse = await fetch('/api/user-profile', {
          method: 'GET',
        });
        
        let userEmail = 'user@example.com'; // fallback
        if (userResponse.ok) {
          const userData = await userResponse.json();
          userEmail = userData.email || userEmail;
        }

        // Create a session object for display purposes
        const displaySession: CheckoutSession = {
          id: sessionId,
          object: 'checkout.session',
          status: 'complete',
          customer: '',
          customer_email: userEmail,
          subscription: ''
        };
        
        setSession(displaySession);
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
