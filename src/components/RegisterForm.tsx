"use client"
import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { handleRegister } from '@/lib/handle-register';
import { RegisterFormData } from '@/types';
import { useRouter } from 'next/navigation';

// Validation schema
const validationSchema = yup.object({
  email: yup
    .string()
    .required('El correo electrónico es requerido.')
    .email('Por favor, introduce un correo electrónico válido.')
    .test('secure-email', 'El dominio del correo electrónico no es válido.', function(value) {
      if (!value) return false;
      
      // Enhanced email validation
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      
      // Check if email matches basic pattern
      if (!emailRegex.test(value)) return false;
      
      // Extract domain part after @
      const domain = value.split('@')[1];
      if (!domain) return false;
      
      // Split domain by dots to check each part
      const domainParts = domain.split('.');
      
      // Check that the top-level domain (last part) contains only letters
      const tld = domainParts[domainParts.length - 1];
      if (!/^[a-zA-Z]+$/.test(tld)) return false;
      
      // Check that domain parts don't start or end with hyphens
      for (const part of domainParts) {
        if (part.startsWith('-') || part.endsWith('-') || part.length === 0) {
          return false;
        }
      }
      
      // Additional security: prevent consecutive dots
      if (domain.includes('..')) return false;
      
      return true;
    }),
  firstName: yup
    .string()
    .required('El nombre es requerido.')
    .trim()
    .min(1, 'El nombre es requerido.'),
  lastName: yup
    .string()
    .required('El apellido es requerido.')
    .trim()
    .min(1, 'El apellido es requerido.'),
  birth_date: yup
    .string()
    .required('La fecha de nacimiento es requerida.')
    .test('age', 'Debes tener al menos 18 años para registrarte.', function(value) {
      if (!value) return false;
      const birthDate = new Date(value);
      const today = new Date();
      const age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        return age - 1 >= 18;
      }
      return age >= 18;
    }),
  password: yup
    .string()
    .required('La contraseña es requerida.')
    .min(8, 'La contraseña debe tener entre 8 y 14 caracteres.')
    .max(14, 'La contraseña debe tener entre 8 y 14 caracteres.'),
  confirmPassword: yup
    .string()
    .required('La confirmación de contraseña es requerida.')
    .oneOf([yup.ref('password')], 'Las contraseñas no coinciden.'),
});

const RegisterForm: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const [serverError, setServerError] = useState<string>('');
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors
  } = useForm<RegisterFormData>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      email: '',
      firstName: '',
      lastName: '',
      birth_date: '',
      password: '',
      confirmPassword: '',
    },
  });

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

  const onSubmit = async (formData: RegisterFormData) => {
    setServerError('');
    clearErrors();
    setIsLoading(true);

    try {
      await handleRegister(formData);
      setIsRegistered(true);
    } catch (err: unknown) {
      if (typeof err === 'object' && err !== null && 'error' in err) {
        if (err.error === 'Email is already taken') {
          setServerError("El correo ya está en uso");
        } else {
          setServerError((err as { error: string }).error);
        }
      } else {
        setServerError('Ha ocurrido un error. Por favor, intenta de nuevo.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row justify-center items-stretch shadow-xl">
      <div className="w-full lg:w-1/2 p-8 lg:p-16 bg-white rounded-t-md lg:rounded-tr-none lg:rounded-l-md">

        {isRegistered ? (<h2 className="text-3xl font-semibold mb-6 text-center">Registro Exitoso!</h2>
        ) : (
          <h2 className="text-3xl font-semibold mb-6 text-center">Registrarse</h2>
        )}

        {isRegistered ? (<div className="text-center">
          <p className="text-lg mb-4 text-green-600">
            Por favor verifica tu email para continuar. Si no lo has recibido,
            revisa tu carpeta de Spam.
          </p>
          <a
            href="/sign-in"
            className="mt-6 inline-block bg-primary-500 text-white py-3 px-8 rounded-md hover:bg-primary-600 transition duration-200"
          >
            Volver a Iniciar Sesión
          </a>
        </div>) : (
          <form onSubmit={handleSubmit(onSubmit)}>
            {serverError && (
              <p className="text-red-500 text-center mb-4">{serverError}</p>
            )}
            <div className="lg:flex gap-x-4">
              <div className="mb-4 lg:w-1/2">
                <label className="block text-gray-700 mb-2">Nombre</label>
                <Controller
                  name="firstName"
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="text"
                      placeholder="Nombre"
                      className={`w-full p-3 border ${errors.firstName ? 'border-red-500' : 'border-gray-300'
                        } rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500`}
                    />
                  )}
                />
                {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName.message}</p>}
              </div>
              <div className="mb-4 lg:w-1/2">
                <label className="block text-gray-700 mb-2">Apellido</label>
                <Controller
                  name="lastName"
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="text"
                      placeholder="Apellido"
                      className={`w-full p-3 border ${errors.lastName ? 'border-red-500' : 'border-gray-300'
                        } rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500`}
                    />
                  )}
                />
                {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName.message}</p>}
              </div>
            </div>

            {/* Birth Date with customised calendar UI */}
            <div className="mb-4 w-full">
              <label className="block text-gray-700 mb-2">Fecha de nacimiento</label>
              <Controller
                name="birth_date"
                control={control}
                render={({ field }) => (
                  <DatePicker
                    selected={field.value ? new Date(field.value) : null}
                    onChange={(date: Date | null) => {
                      field.onChange(date ? date.toISOString().split('T')[0] : '');
                    }}
                    placeholderText="Selecciona tu fecha de nacimiento"
                    dateFormat="MM-dd-yyyy"
                    className={`w-full p-3 border ${errors.birth_date ? 'border-red-500' : 'border-gray-300'
                      } rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500`}
                    calendarClassName="react-datepicker-custom"
                    showYearDropdown
                    showMonthDropdown
                    dropdownMode="select"
                    minDate={new Date(1900, 0, 1)}
                    maxDate={new Date(Date.now() - 18 * 365 * 24 * 60 * 60 * 1000)} // 18 years ago
                    yearDropdownItemNumber={100}
                  />
                )}
              />
              {errors.birth_date && <p className="text-red-500 text-sm mt-1">{errors.birth_date.message}</p>}
            </div>

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

            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Confirmar contraseña</label>
              <Controller
                name="confirmPassword"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    type="password"
                    placeholder="Confirmar contraseña"
                    className={`w-full p-3 border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                      } rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500`}
                  />
                )}
              />
              {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full bg-gradient-to-br from-primary-300 to-primary-500 text-white py-3 rounded-md hover:bg-primary-600 transition duration-200 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
            >
              {isLoading ? 'Registrando...' : 'Registrarse'}
            </button>

            {!isRegistered && (
              <a
                href="/sign-in"
                className="block text-center w-full mt-4 bg-gray-200 text-primary-500 py-3 rounded-md hover:bg-gray-300 transition duration-200 lg:hidden"
              >
                Iniciar sesión
              </a>
            )}
          </form>)}
      </div>


      {!isRegistered && (<div className="hidden lg:flex w-full lg:w-1/2 p-8 bg-gradient-to-br from-primary-300 to-primary-500 text-white items-center justify-center rounded-b-md lg:rounded-none lg:rounded-r-md">
        <div className="text-center">
          <h2 className="text-4xl font-semibold">Bienvenido a Cremación Directa</h2>
          <p className="mt-4 text-lg">¿Ya tienes una cuenta?</p>
          <a
            href="/sign-in"
            className="mt-6 inline-block bg-white text-primary-500 py-3 px-8 rounded-md hover:bg-gray-100 transition duration-200"
          >
            Inicia sesión
          </a>
        </div>
      </div>)}
    </div>
  );
};

export default RegisterForm;