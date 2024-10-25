import { RegisterFormData, SuccessResponse, User, FailureResponse } from '@/types';

export const handleRegister = async (
  formData: RegisterFormData
): Promise<void> => {
  try {
    const payload = { ...formData };

    const res = await fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      credentials: 'include', // Include cookies
    });

    const data: SuccessResponse<User> | FailureResponse = await res.json();

    // Check if there's an error
    if ('error' in data && data.error) {
      const errorMessage = data.error.message || 'Error de registro.';
      throw { general: errorMessage };
    }

    // Registration successful
    console.log('Registro exitoso:', data);

  } catch (err) {
    // Error handling remains the same
    if (err instanceof Error) {
      console.error('Error during registration:', err.message);
      throw { general: err.message };
    } else {
      console.error('Unknown error during registration:', err);
      throw { general: 'Error de registro.' };
    }
  }
};
