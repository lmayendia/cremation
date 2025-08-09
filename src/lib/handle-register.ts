import { RegisterFormData, SuccessResponse, User, FailureResponse } from '@/types';

export const handleRegister = async (
  formData: RegisterFormData
): Promise<void> => {
  try {
  
    const registrationData = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      birth_date: formData.birth_date,
      email: formData.email,
      password: formData.password
    };
  
    const res = await fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(registrationData),
      credentials: 'include', // Include cookies
    });

    const data: SuccessResponse<User> | FailureResponse = await res.json();

    // Check if there's an error
    if (data && data.error) {
      const errorMessage = data.error.message;
      throw errorMessage
    }


  } catch (err) {
    // Error handling remains the same
    if (err instanceof Error) {
      console.error('Error during registration:', err.message);
      throw { error: err };
    } else {
      console.error('Unknown error during registration:', err);
      throw { error: err };
    }
  }
};
