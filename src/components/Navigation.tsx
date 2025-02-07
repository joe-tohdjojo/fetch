import Link from 'next/link';

import { Button } from '@/components/ui/button';

export async function Navigation() {
  return (
    <nav className="flex w-full items-center justify-between border-b p-6 md:p-10">
      <div className="w-full max-w-sm">
        <h3>Fetch Dogs</h3>
      </div>
      <Button asChild>
        <Link href="/login">Login</Link>
      </Button>
    </nav>
  );
}
