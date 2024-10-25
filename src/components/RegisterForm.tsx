// components/RegisterForm.tsx
"use client";
import React, { useState } from 'react';
import { handleRegister } from '@/lib/handle-register';
import { RegisterFormData, RegisterFormErrors } from '@/types'; // Ensure you have RegisterFormErrors type
import { useRouter } from 'next/navigation';

const RegisterForm: React.FC = () => {
  // State variables for form inputs
  const [formData, setFormData] = useState<RegisterFormData>({
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
  });

  // State for error messages per field
  const [errors, setErrors] = useState<RegisterFormErrors>({});

  // State for loading
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const router = useRouter();

  // Function to handle form submission
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Reset errors
    setErrors({});

    const newErrors: RegisterFormErrors = {};

    // Email validation using regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[A-Za-z]{2,}$/;
    if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Por favor, introduce un correo electrónico válido.';
    }

    // Username validation
    if (!formData.username || formData.username.trim() === '') {
      newErrors.username = 'El nombre de usuario es requerido.';
    }

    // Password length validation
    if (formData.password.length < 8 || formData.password.length > 14) {
      newErrors.password = 'La contraseña debe tener entre 8 y 14 caracteres.';
    }

    // Confirm password validation
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Las contraseñas no coinciden.';
    }

    // If there are errors, set them and return
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true); // Start loading

    try {
      await handleRegister(formData);
      // Registration successful
      alert('Registro exitoso. Por favor, inicia sesión.');
      router.push('/sign-in'); // Redirect to sign-in after success
    } catch (err: unknown) {
      // Safely handle errors using type checks
      if (typeof err === 'object' && err !== null && 'general' in err) {
        setErrors(err as RegisterFormErrors); // Assuming errors is of type RegisterFormErrors
      } else {
        setErrors({ general: 'Error de registro.' });
      }
    } finally {
      setIsLoading(false); // End loading
    }
  };

  // Function to handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex flex-col lg:flex-row justify-center items-stretch min-h-full bg-gray-100 shadow-xl">
      {/* Left side (Sign Up Form) */}
      <div className="w-full lg:w-1/2 p-8 lg:p-16 bg-white rounded-l-md lg:rounded-r-none">
        <h2 className="text-3xl font-semibold mb-6 text-center">Registrarse</h2>

        <form onSubmit={onSubmit}>
          {/* Display general error message if any */}
          {errors.general && (
            <p className="text-red-500 text-center mb-4">{errors.general}</p>
          )}

          {/* Correo electrónico */}
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
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          {/* Nombre de usuario */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Nombre de usuario</label>
            <input
              type="text"
              name="username"
              placeholder="Nombre de usuario"
              value={formData.username}
              onChange={handleChange}
              required
              className={`w-full p-3 border ${
                errors.username ? 'border-red-500' : 'border-gray-300'
              } rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500`}
            />
            {errors.username && (
              <p className="text-red-500 text-sm mt-1">{errors.username}</p>
            )}
          </div>

          {/* Contraseña */}
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
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          {/* Confirmar contraseña */}
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
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
            )}
          </div>

          {/* Sign Up Button */}
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full bg-gradient-to-br from-primary-300 to-primary-500 text-white py-3 rounded-md hover:bg-primary-600 transition duration-200 ${
              isLoading ? 'opacity-50 cursor-not-allowed' : ''
            }`}>
            {isLoading ? 'Registrando...' : 'Registrarse'}
          </button>

          {/* Responsive: Sign In Button */}
          <a
            href="/sign-in"
            className="block text-center w-full mt-4 bg-gray-200 text-primary-500 py-3 rounded-md hover:bg-gray-300 transition duration-200 lg:hidden">
            Iniciar sesión
          </a>
        </form>
      </div>

      {/* Right side for larger screens */}
      <div className="hidden lg:flex w-1/2 p-8 bg-gradient-to-br from-primary-300 to-primary-500 text-white items-center justify-center rounded-r-md lg:rounded-l-none shadow-lg">
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
