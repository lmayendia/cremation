"use client";
import React, { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

const ResetPasswordForm: React.FC = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const code = searchParams.get('code');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      setIsLoading(false);
      return;
    }

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/auth/reset-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          code,
          password,
          passwordConfirmation: confirmPassword,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error?.message || 'Error al restablecer la contraseña');
      }

      setSuccess(true);
      setTimeout(() => router.push('/sign-in'), 3000);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Error desconocido');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (

    <section className="lg:p-52 md:p-32 px-20 py-32">
    <div className="flex flex-col lg:flex-row justify-center items-stretch shadow-xl">
      <div className="w-full lg:w-1/2 p-6 md:p-12 lg:p-16 bg-white rounded-t-md lg:rounded-tr-none lg:rounded-l-md">
        <h2 className="text-3xl font-semibold mb-6 text-center">Nueva contraseña</h2>

        {success ? (
          <div className="text-center">
            <p className="text-green-500 mb-4">¡Contraseña actualizada correctamente!</p>
            <p>Redirigiendo al inicio de sesión...</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Nueva contraseña</label>
              <input
                type="password"
                placeholder="Nueva contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Confirmar contraseña</label>
              <input
                type="password"
                placeholder="Confirmar contraseña"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>

            {error && <p className="text-red-500 text-center mb-4">{error}</p>}

            <button
              type="submit"
              className="w-full bg-gradient-to-br from-primary-300 to-primary-500 text-white py-3 rounded-md hover:bg-primary-600 transition duration-200"
              disabled={isLoading}
            >
              {isLoading ? 'Actualizando...' : 'Restablecer contraseña'}
            </button>
          </form>
        )}

        <div className="mt-6 text-center">
          <button
            onClick={() => router.push('/sign-in')}
            className="text-primary-500 hover:underline"
          >
            Volver al inicio de sesión
          </button>
        </div>
      </div>

      {/* Right side (same as login) */}
      <div className="hidden lg:flex w-full lg:w-1/2 p-8 bg-gradient-to-br from-primary-300 to-primary-500 text-white items-center justify-center rounded-b-md lg:rounded-none lg:rounded-r-md shadow-lg">
        <div className="text-center">
          <h2 className="text-4xl font-semibold">Cremación Directa</h2>
          <p className="mt-4 text-lg">Seguridad primero</p>
        </div>
      </div>
    </div>


    </section>
  );
};

export default ResetPasswordForm;