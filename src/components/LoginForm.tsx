'use client';

import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';

const formSchema = z.object({
  email: z.string().email(),

  // INFO: I would add more constraints here if product requirements dictate.
  name: z.string().min(2, {
    message: 'Name must be at least 2 characters long.',
  }),
});

type FormSchema = z.infer<typeof formSchema>;

async function login(values: z.infer<typeof formSchema>) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/auth/login`,
    {
      body: JSON.stringify(values),
      credentials: 'include',
      method: 'POST',
      headers: new Headers({
        accept: 'text/plain',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      }),
    },
  );

  if (!response.ok) {
    throw new Error('Failed to login');
  }
}

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<'div'>) {
  const router = useRouter();
  const { toast } = useToast();
  const mutation = useMutation({
    mutationFn: login,
    onSuccess: () => {
      router.push('/search?page=1&breed=All+breeds&sortBy=breed&sort=asc');
    },
    onError: (error) => {
      toast({
        description: error.message,
      });
    },
  });

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      name: '',
    },
  });

  async function onSubmit(values: FormSchema) {
    await mutation.mutate(values);
  }

  return (
    <div
      className={cn('flex flex-col gap-6', className)}
      {...props}
    >
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-8"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Your name</FormLabel>
                    <FormControl>
                      <Input
                        disabled={mutation.isPending}
                        placeholder="Elmo"
                        required
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        disabled={mutation.isPending}
                        placeholder="email@example.com"
                        required
                        type="email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="w-full"
                disabled={mutation.isPending}
              >
                Login
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
