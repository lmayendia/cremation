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
        alert('Logged out successfully.');
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
      className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-200">
      Logout
    </button>
  );
};

export default LogoutButton;
