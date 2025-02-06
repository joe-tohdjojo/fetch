import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="">
      <main className="flex h-screen flex-col items-center justify-center gap-8">
        <h1>Welcome to Fetch</h1>
        <Button
          asChild
          variant="default"
        >
          <Link href="/login">Login</Link>
        </Button>
      </main>
    </div>
  );
}
