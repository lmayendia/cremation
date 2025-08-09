// components/LoginForm.tsx
"use client";
import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useRouter, useSearchParams } from 'next/navigation';

// Login form data interface
interface LoginFormData {
  email: string;
  password: string;
  rememberMe: boolean;
}

// Validation schema
const validationSchema = yup.object({
  email: yup
    .string()
    .required('El correo electrónico es requerido.')
    .email('Por favor, introduce un correo electrónico válido.'),
  password: yup
    .string()
    .required('La contraseña es requerida.')
    .min(1, 'La contraseña es requerida.'),
  rememberMe: yup.boolean().default(false),
});

const LoginForm: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState<string>('');

  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get('redirect') || '/profile';

  const {
    control,
    handleSubmit,
    formState: { errors },
    clearErrors
  } = useForm<LoginFormData>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  });

  const onSubmit = async (formData: LoginFormData) => {
    setIsLoading(true);
    setServerError('');
    clearErrors();

    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          identifier: formData.email.trim(),
          password: formData.password.trim(),
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data?.error || 'Error during login.');
      }

      // Trigger the storage event to notify the navbar of the JWT change
      localStorage.setItem('jwt-changed', 'true');
      
      // Add a small delay to ensure the cookie is set before dispatching the event
      setTimeout(() => {
        // Dispatch a custom storage event since setting localStorage from the same window doesn't trigger the event
        window.dispatchEvent(new StorageEvent('storage', {
          key: 'jwt-changed',
          newValue: 'true',
          storageArea: localStorage
        }));
      }, 100);

      // Redirect to the provided redirect URL or to /profile by default
      router.push(redirectUrl);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setServerError(err.message || 'Something went wrong.');
      } else {
        setServerError('An unexpected error occurred.');
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

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Email Field */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Correo electrónico</label>
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  type="email"
                  placeholder="Correo electrónico"
                  className={`w-full p-3 border ${errors.email ? 'border-red-500' : 'border-gray-300'
                    } rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500`}
                />
              )}
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
          </div>

          {/* Password Field */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Contraseña</label>
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  type="password"
                  placeholder="Contraseña"
                  className={`w-full p-3 border ${errors.password ? 'border-red-500' : 'border-gray-300'
                    } rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500`}
                />
              )}
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
          </div>

          {/* Remember Me & Forgot Password */}
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center">
              <Controller
                name="rememberMe"
                control={control}
                render={({ field: { value, onChange, ...field } }) => (
                  <input
                    {...field}
                    type="checkbox"
                    id="remember"
                    checked={value}
                    onChange={(e) => onChange(e.target.checked)}
                    className="mr-2 focus:ring-primary-500"
                  />
                )}
              />
              <label htmlFor="remember" className="text-gray-700">Recuérdame</label>
            </div>
            <a href="/reset-password" className="text-primary-500 hover:underline">¿Olvidaste la contraseña?</a>
          </div>

          {/* Display error message */}
          {serverError && (
            <p className="text-red-500 text-center mb-4">{serverError}</p>
          )}

          {/* Sign In Button */}
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full bg-gradient-to-br from-primary-300 to-primary-500 text-white py-3 rounded-md hover:bg-primary-600 transition duration-200 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
          >
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
