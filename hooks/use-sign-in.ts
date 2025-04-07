'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { routes } from '@/constants/routes';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { validationMessages } from '@/utils';
import { signInAction } from '@/app/auth/actions';

// Schema for the sign-in form validation
export const signInSchema = z.object({
  email: z
    .string()
    .min(1, { message: validationMessages.required('Email') })
    .email({ message: 'Invalid email format' }),
  password: z
    .string()
    .min(1, { message: validationMessages.required('Password') })
    .min(6, { message: 'Password must be at least 6 characters' }),
});

// Type for the form values based on the Zod schema
export type SignInFormValues = z.infer<typeof signInSchema>;

export function useSignIn() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || routes.dashboard.root;
  const router = useRouter();

  // Initialize react-hook-form with Zod validation
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<SignInFormValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  // Form submission handler
  const onSubmit = async (data: SignInFormValues) => {

    try {
      const response = await signInAction(data);
      if (response.ok) {
        router.push(callbackUrl);
      } else {
        setError('root', { message: 'Invalid email or password. Please try again.' });
      }
    } catch (error) {
      setError('root', { message: 'An error occurred while logging in. Please try again.' });
    }
  };

  return {
    register,
    handleSubmit,
    errors,
    isLoading: isSubmitting,
    formError: errors.root?.message,
    onSubmit
  };
} 