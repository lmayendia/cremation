// app/profile/page.tsx

'use client';

import React, { useEffect, useState } from 'react';
import { User, UserProfileResponse } from '@/types';
import LogoutButton from '@/components/LogoutButton'; // Import the LogoutButton

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

        const data: UserProfileResponse = await res.json();

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
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center mt-10">{error}</div>;
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-md">
      <h1 className="text-2xl font-bold mb-4">Your Profile</h1>
      <p>
        <strong>Username:</strong> {user?.username}
      </p>
      <p>
        <strong>Email:</strong> {user?.email}
      </p>
      <p>
        <strong>Provider:</strong> {user?.provider}
      </p>
      <p>
        <strong>Confirmed:</strong> {user?.confirmed ? 'Yes' : 'No'}
      </p>
      <p>
        <strong>Blocked:</strong> {user?.blocked ? 'Yes' : 'No'}
      </p>
      {/* Add more fields as necessary */}

      {/* Logout Button */}
      <div className="mt-6 flex justify-end">
        <LogoutButton />
      </div>
    </div>
  );
};

export default ProfilePage;
