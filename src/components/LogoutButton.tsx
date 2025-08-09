// components/LogoutButton.tsx

'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

const LogoutButton: React.FC = () => {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const res = await fetch('/api/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (res.ok) {
        // Trigger the storage event to notify the navbar of the JWT change
        localStorage.setItem('jwt-changed', 'true');
        
        // Dispatch a custom storage event since setting localStorage from the same window doesn't trigger the event
        window.dispatchEvent(new StorageEvent('storage', {
          key: 'jwt-changed',
          newValue: 'true',
          storageArea: localStorage
        }));
        
        router.refresh();
        router.push('/sign-in'); // Redirect to login page after logout
      } else {
        alert('Failed to logout.');
      }
    } catch (error) {
      console.error('Logout error:', error);
      alert('An unexpected error occurred.');
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="bg-red-500 text-white px-4 py-1 rounded-md hover:bg-red-600 transition duration-200">
      Logout
    </button>
  );
};

export default LogoutButton;
