import { Search } from '@/components/Search';

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{
    page: number;
  }>;
}) {
  const { page } = await searchParams;
  return (
    <main className="flex h-full flex-col items-center justify-center gap-8 px-4">
      <Search page={page && Number(page)} />
    </main>
  );
}

export const dynamic = 'force-dynamic';
