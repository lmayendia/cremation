// components/RegisterForm.tsx
"use client";
import React, { useState, useEffect } from 'react';
import { handleRegister } from '@/lib/handle-register';
import { RegisterFormData, RegisterFormErrors } from '@/types';
import { useRouter } from 'next/navigation';

const RegisterForm: React.FC = () => {
  const [formData, setFormData] = useState<RegisterFormData>({
    email: '',
    firstName: '',
    lastName: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState<RegisterFormErrors>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const res = await fetch('/api/check-auth');
      const data = await res.json();

      if (data.authenticated) {
        router.push('/profile');
      }
    };

    checkAuth();
  }, [router]);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});

    const newErrors: RegisterFormErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[A-Za-z]{2,}$/;

    // Email validation
    if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Por favor, introduce un correo electrónico válido.';
    }

    // First Name validation
    if (!formData.firstName || formData.firstName.trim() === '') {
      newErrors.firstName = 'El nombre es requerido.';
    }

    // Last Name validation
    if (!formData.lastName || formData.lastName.trim() === '') {
      newErrors.lastName = 'El apellido es requerido.';
    }

    // Password length validation
    if (formData.password.length < 8 || formData.password.length > 14) {
      newErrors.password = 'La contraseña debe tener entre 8 y 14 caracteres.';
    }

    // Confirm password validation
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Las contraseñas no coinciden.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);

    try {
      await handleRegister(formData);
      localStorage.setItem('jwt-changed', Date.now().toString()); // Unique value
      router.push('/profile');
    } catch (err: unknown) {
      if (typeof err === 'object' && err !== null && 'general' in err) {
        setErrors(err as RegisterFormErrors);
      } else {
        setErrors({ general: 'Error de registro.' });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex flex-col lg:flex-row justify-center items-stretch shadow-xl">
      {/* Left side (Sign Up Form) */}
      <div className="w-full lg:w-1/2 p-8 lg:p-16 bg-white rounded-t-md lg:rounded-tr-none lg:rounded-l-md">
        <h2 className="text-3xl font-semibold mb-6 text-center">Registrarse</h2>
        <form onSubmit={onSubmit}>
          {errors.general && (
            <p className="text-red-500 text-center mb-4">{errors.general}</p>
          )}
          {/* First Name Field */}
          <div className='lg:flex gap-x-4'>
            <div className="mb-4 lg:w-1/2">
              <label className="block text-gray-700 mb-2">Nombre</label>
              <input
                type="text"
                name="firstName"
                placeholder="Nombre"
                value={formData.firstName}
                onChange={handleChange}
                required
                className={`w-full p-3 border ${
                  errors.firstName ? 'border-red-500' : 'border-gray-300'
                } rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500`}
              />
              {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
            </div>

            {/* Last Name Field */}
            <div className="mb-4 lg:w-1/2">
              <label className="block text-gray-700 mb-2">Apellido</label>
              <input
                type="text"
                name="lastName"
                placeholder="Apellido"
                value={formData.lastName}
                onChange={handleChange}
                required
                className={`w-full p-3 border ${
                  errors.lastName ? 'border-red-500' : 'border-gray-300'
                } rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500`}
              />
              {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
            </div>

          </div>

          {/* Email Field */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Correo electrónico</label>
            <input
              type="email"
              name="email"
              placeholder="Correo electrónico"
              value={formData.email}
              onChange={handleChange}
              required
              className={`w-full p-3 border ${
                errors.email ? 'border-red-500' : 'border-gray-300'
              } rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500`}
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>


          {/* Password Field */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Contraseña</label>
            <input
              type="password"
              name="password"
              placeholder="Contraseña"
              value={formData.password}
              onChange={handleChange}
              required
              className={`w-full p-3 border ${
                errors.password ? 'border-red-500' : 'border-gray-300'
              } rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500`}
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
          </div>

          {/* Confirm Password Field */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Confirmar contraseña</label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirmar contraseña"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              className={`w-full p-3 border ${
                errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
              } rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500`}
            />
            {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full bg-gradient-to-br from-primary-300 to-primary-500 text-white py-3 rounded-md hover:bg-primary-600 transition duration-200 ${
              isLoading ? 'opacity-50 cursor-not-allowed' : ''
            }`}>
            {isLoading ? 'Registrando...' : 'Registrarse'}
          </button>

          <a
            href="/sign-in"
            className="block text-center w-full mt-4 bg-gray-200 text-primary-500 py-3 rounded-md hover:bg-gray-300 transition duration-200 lg:hidden">
            Iniciar sesión
          </a>
        </form>
      </div>

      {/* Right side for larger screens */}
      <div className="hidden lg:flex w-full lg:w-1/2 p-8 bg-gradient-to-br from-primary-300 to-primary-500 text-white items-center justify-center rounded-b-md lg:rounded-none lg:rounded-r-md">
        <div className="text-center">
          <h2 className="text-4xl font-semibold">Bienvenido a Cremación Directa</h2>
          <p className="mt-4 text-lg">¿Ya tienes una cuenta?</p>
          <a
            href="/sign-in"
            className="mt-6 inline-block bg-white text-primary-500 py-3 px-8 rounded-md hover:bg-gray-100 transition duration-200">
            Inicia sesión
          </a>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
