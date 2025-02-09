import Link from 'next/link';
import { Dog } from 'lucide-react';

import { ThemeToggle } from '@/components/ThemeToggle';
import { AuthButton } from '@/components/AuthButton';

/**
 * Navigation component that renders the app's navigation bar
 * @returns {JSX.Element} Navigation component
 */
export async function Navigation() {
  return (
    <nav className="flex w-full items-center justify-between border-b p-6 md:p-8">
      <Link
        className="w-full max-w-sm"
        href="/"
      >
        <Dog className="h-8 w-8" />
      </Link>
      <div className="flex gap-4">
        <ThemeToggle />
        <AuthButton />
      </div>
    </nav>
  );
}
