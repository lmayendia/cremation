// components/LoginForm.tsx
"use client";
import React, { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

const LoginForm: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get('redirect') || '/profile';

  const sanitizeInput = (input: string) => input.trim();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    // Sanitize inputs
    const sanitizedUsername = sanitizeInput(username);
    const sanitizedPassword = sanitizeInput(password);

    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          identifier: sanitizedUsername,
          password: sanitizedPassword,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data?.error || 'Error during login.');
      }

      // Redirect to the provided redirect URL or to /profile by default
      router.push(redirectUrl);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message || 'Something went wrong.');
      } else {
        setError('An unexpected error occurred.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row justify-center items-stretch shadow-xl">
      {/* Left side (Sign In Form) */}
      <div className="w-full lg:w-1/2 p-6 md:p-12 lg:p-16 bg-white rounded-t-md lg:rounded-tr-none lg:rounded-l-md">
        <h2 className="text-3xl font-semibold mb-6 text-center">Iniciar sesión</h2>

        <form onSubmit={handleLogin}>
          {/* Username Field */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Usuario</label>
            <input
              type="text"
              placeholder="Usuario"
              value={username}
              onChange={(e) => setUsername(sanitizeInput(e.target.value))}
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>

          {/* Password Field */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Contraseña</label>
            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(sanitizeInput(e.target.value))}
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>

          {/* Remember Me & Forgot Password */}
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="remember"
                className="mr-2 focus:ring-primary-500"
              />
              <label htmlFor="remember" className="text-gray-700">Recuérdame</label>
            </div>
            <a href="/reset-password" className="text-primary-500 hover:underline">¿Olvidaste la contraseña?</a>
          </div>

          {/* Display error message */}
          {error && (
            <p className="text-red-500 text-center mb-4">{error}</p>
          )}

          {/* Sign In Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-br from-primary-300 to-primary-500 text-white py-3 rounded-md hover:bg-primary-600 transition duration-200"
            disabled={isLoading}>
            {isLoading ? 'Cargando...' : 'Iniciar sesión'}
          </button>

          {/* Responsive: Sign Up Button */}
          <button
            type="button"
            onClick={() => router.push('/sign-up')}
            className="w-full mt-4 bg-gray-200 text-primary-500 py-3 rounded-md hover:bg-gray-300 transition duration-200 lg:hidden">
            Registrarse
          </button>
        </form>
      </div>

      {/* Right side for larger screens */}
      <div className="hidden lg:flex w-full lg:w-1/2 p-8 bg-gradient-to-br from-primary-300 to-primary-500 text-white items-center justify-center rounded-b-md lg:rounded-none lg:rounded-r-md shadow-lg">
        <div className="text-center">
          <h2 className="text-4xl font-semibold">Bienvenido a Cremación Directa</h2>
          <p className="mt-4 text-lg">¿No tienes una cuenta?</p>
          <a
            href="/sign-up"
            className="mt-6 inline-block bg-white text-primary-500 py-3 px-8 rounded-md hover:bg-gray-100 transition duration-200">
            Regístrate
          </a>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
