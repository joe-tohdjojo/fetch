import { Search } from '@/components/Search';
import { SearchContextProvider } from '@/context/SearchContext';

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{
    page: number;
    breed: string;
    sort: 'asc' | 'desc';
    sortBy: 'age' | 'breed' | 'name';
  }>;
}) {
  const { page, breed, sort, sortBy } = await searchParams;
  return (
    <main className="mb-36 mt-8 flex h-full flex-col items-center gap-8 px-4">
      <SearchContextProvider
        page={page && Number(page)}
        breed={breed}
        sort={sort}
        sortBy={sortBy}
      >
        <Search />
      </SearchContextProvider>
    </main>
  );
}

export const dynamic = 'force-dynamic';
