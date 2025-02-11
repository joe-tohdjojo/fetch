import { useMutation } from '@tanstack/react-query';
import { z } from 'zod';

export const formSchema = z.object({
  email: z.string().email(),

  // INFO: I would add more constraints here if product requirements dictate.
  name: z.string().min(2, {
    message: 'Name must be at least 2 characters long.',
  }),
});

export type FormSchema = z.infer<typeof formSchema>;

/**
 * Performs user login by making a request to the login endpoint
 * @param {FormSchema} values - Login form values
 * @returns {Promise<Response>} Fetch response from the login request
 */
async function login(values: z.infer<typeof formSchema>) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/auth/login`,
    {
      body: JSON.stringify(values),
      credentials: 'include',
      method: 'POST',
      headers: new Headers({
        accept: '*',
        'Content-Type': 'application/json',
      }),
    },
  );

  if (!response.ok) {
    throw new Error('Failed to login');
  }
}

interface Options {
  onError: (err: Error) => void;
  onSuccess: () => void;
}

export const useLogin = ({ onError, onSuccess }: Options) => {
  return useMutation({
    mutationFn: login,
    onSuccess,
    onError,
  });
};
