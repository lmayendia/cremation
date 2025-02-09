"use client"
import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { handleRegister } from '@/lib/handle-register';
import { RegisterFormData, RegisterFormErrors } from '@/types';
import { useRouter } from 'next/navigation';

const RegisterForm: React.FC = () => {
  const [formData, setFormData] = useState<RegisterFormData>({
    email: '',
    firstName: '',
    lastName: '',
    birth_date: '',
    password: '',
    confirmPassword: '',
  });
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [errors, setErrors] = useState<RegisterFormErrors>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isRegistered, setIsRegistered] = useState(false);
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

    if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Por favor, introduce un correo electrónico válido.';
    }
    if (!formData.firstName || formData.firstName.trim() === '') {
      newErrors.firstName = 'El nombre es requerido.';
    }
    if (!formData.lastName || formData.lastName.trim() === '') {
      newErrors.lastName = 'El apellido es requerido.';
    }
    if (!formData.birth_date) {
      newErrors.birth_date = 'La fecha de nacimiento es requerida.';
    }
    if (formData.password.length < 8 || formData.password.length > 14) {
      newErrors.password = 'La contraseña debe tener entre 8 y 14 caracteres.';
    }
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
      localStorage.setItem('jwt-changed', Date.now().toString());
      setIsRegistered(true); // Changed from router.push
    } catch (err: unknown) {
      if (typeof err === 'object' && err !== null && 'general' in err) {
        setErrors(err as RegisterFormErrors);
      } else {
        console.log(err)
        if (typeof err === 'object' && err !== null && 'error' in err) {
          if (err.error === 'Email is already taken') {

            setErrors({ general: "El correo ya está en uso" });
          } else {
            setErrors({ general: (err as { error: string }).error });

          }
        } else {
          setErrors({ general: 'Ha ocurrido un error. Por favor, intenta de nuevo.' });
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
    setFormData({
      ...formData,
      birth_date: date ? date.toISOString().split('T')[0] : '',
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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
          <form onSubmit={onSubmit}>
            {errors.general && (
              <p className="text-red-500 text-center mb-4">{errors.general}</p>
            )}
            <div className="lg:flex gap-x-4">
              <div className="mb-4 lg:w-1/2">
                <label className="block text-gray-700 mb-2">Nombre</label>
                <input
                  type="text"
                  name="firstName"
                  placeholder="Nombre"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  className={`w-full p-3 border ${errors.firstName ? 'border-red-500' : 'border-gray-300'
                    } rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500`}
                />
                {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
              </div>
              <div className="mb-4 lg:w-1/2">
                <label className="block text-gray-700 mb-2">Apellido</label>
                <input
                  type="text"
                  name="lastName"
                  placeholder="Apellido"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  className={`w-full p-3 border ${errors.lastName ? 'border-red-500' : 'border-gray-300'
                    } rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500`}
                />
                {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
              </div>
            </div>

            {/* Birth Date with customised calendar UI */}
            <div className="mb-4 w-full">
              <label className="block text-gray-700 mb-2">Fecha de nacimiento</label>
              <DatePicker
                selected={selectedDate}
                onChange={handleDateChange}
                placeholderText="Selecciona tu fecha de nacimiento"
                dateFormat="MM-dd-yyyy"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                calendarClassName="react-datepicker-custom"
                showYearDropdown
                showMonthDropdown
                dropdownMode="select"
                minDate={new Date(1900, 0, 1)}
                maxDate={new Date()}
                yearDropdownItemNumber={100}
              />
              {errors.birth_date && <p className="text-red-500 text-sm mt-1">{errors.birth_date}</p>}
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Correo electrónico</label>
              <input
                type="email"
                name="email"
                placeholder="Correo electrónico"
                value={formData.email}
                onChange={handleChange}
                required
                className={`w-full p-3 border ${errors.email ? 'border-red-500' : 'border-gray-300'
                  } rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500`}
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Contraseña</label>
              <input
                type="password"
                name="password"
                placeholder="Contraseña"
                value={formData.password}
                onChange={handleChange}
                required
                className={`w-full p-3 border ${errors.password ? 'border-red-500' : 'border-gray-300'
                  } rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500`}
              />
              {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Confirmar contraseña</label>
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirmar contraseña"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                className={`w-full p-3 border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                  } rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500`}
              />
              {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
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

      <div className="hidden lg:flex w-full lg:w-1/2 p-8 bg-gradient-to-br from-primary-300 to-primary-500 text-white items-center justify-center rounded-b-md lg:rounded-none lg:rounded-r-md">
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
      </div>
    </div>
  );
};

export default RegisterForm;