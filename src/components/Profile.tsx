'use client';

import React, { useEffect, useState } from 'react';
import { User, SubscriptionData } from '@/types';
import Link from 'next/link';

const ProfilePage: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const res = await fetch('/api/user-profile', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        const data = await res.json();

        if (res.ok && data.data) {
          setUser(data.data);
        } else {
          setError(data.error || 'Failed to load profile.');
        }
      } catch (err) {
        console.error('Error fetching profile:', err);
        setError('An unexpected error occurred.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">
            <div className="overlay">
        <div className="loader"></div>
      </div>
    </div>;
  }

  if (error) {
    return <div className="text-red-500 text-center my-auto">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Header */}
      <header className="bg-primary-500 shadow-md">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-white">Bienvenido, {user?.nombre}!</h1>
          <p className="text-white">Que bueno tenerte de vuelta!</p>
        </div>
      </header>

      {/* Main Content */}
        <section className='p-12'>
          {user?.subscriptions?.length ? (
              user.subscriptions.map((subscription: SubscriptionData) => (
                  <div key={subscription.id} className="bg-white p-6 rounded-md shadow-md mb-6">
                  <h2 className="text-2xl font-bold mb-6">Tus planes:</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="mb-2">
                      <strong>Active Plan:</strong> {subscription.plan_name}
                    </p>
                    <p className="mb-2">
                      <strong>Installments Remaining:</strong>{' '}
                      {subscription.amount_of_cycles - subscription.amount_paid_cycles}
                    </p>
                    <p className="mb-2">
                      <strong>Amount Paid:</strong> ${subscription.amount_paid.toFixed(2)}
                    </p>
                    <p className="mb-2">
                      <strong>Total Amount:</strong> ${subscription.total_amount_to_pay.toFixed(2)}
                    </p>
                  </div>
                  <div>
                    <p className="mb-2">
                      <strong>Amount Due:</strong> ${subscription.amount_due.toFixed(2)}
                    </p>
                    <p className="mb-2">
                      <strong>Purchase Date:</strong> {subscription.starting_date}
                    </p>
                    <p className="mb-2">
                      <strong>Next Payment:</strong> {subscription.next_payment_date}
                    </p>
                  </div>
                </div>
                <button className="mt-4 px-4 py-2 text-white bg-green-600 rounded-md hover:bg-green-700">
                  Make a Payment
                </button>
              </div>
            ))
          ) : (
            <p className="text-gray-600">
            Parece que no tienes suscripciones activas aún. Revisa nuestros planes en{' '}
            <Link href="/#pricing">
              <span className="text-blue-600 hover:underline">
                nuestra página de planes
              </span>
            </Link>.
          </p>
          )}
        </section>

    </div>
  );
};

export default ProfilePage;
