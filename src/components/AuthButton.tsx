'use client';

import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useMutation } from '@tanstack/react-query';

import { Button } from '@/components/ui/button';
async function logout() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/auth/logout`,
    {
      credentials: 'include',
      method: 'POST',
      headers: new Headers({
        accept: 'text/plain',
        'Content-Type': 'application/json',
      }),
    },
  );

  if (!response.ok) {
    throw new Error('Failed to logout');
  }
}
export function AuthButton() {
  const pathname = usePathname();
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      router.push('/login');
    },
  });

  const unAuthorizedPaths = ['/'];

  if (pathname === '/login') {
    return null;
  }

  return unAuthorizedPaths.includes(pathname) ? (
    <Button>
      <Link href="/login">Login</Link>
    </Button>
  ) : (
    <Button
      onClick={() => mutation.mutate()}
      variant="secondary"
    >
      Logout
    </Button>
  );
}
