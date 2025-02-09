import { Search } from '@/components/Search';
import { SearchContextProvider } from '@/context/SearchContext';
import { z } from 'zod';

const searchParamsSchema = z.object({
  page: z.coerce.number().optional().default(1),
  breed: z.string().optional().default(''),
  sort: z.enum(['asc', 'desc']).optional().default('asc'),
  sortBy: z.enum(['age', 'breed', 'name']).optional().default('name'),
});

/**
 * Search page component that displays the dog search interface
 * @param {Object} props - Component props
 * @param {Promise<{ [key: string]: string | string[] | undefined }>} props.searchParams - URL search parameters
 * @returns {JSX.Element} Search page component
 */
export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const validatedParams = searchParamsSchema.parse(await searchParams);

  return (
    <main className="mb-36 mt-8 flex h-full flex-col items-center gap-8 px-4">
      <SearchContextProvider
        page={validatedParams.page}
        breed={validatedParams.breed}
        sort={validatedParams.sort}
        sortBy={validatedParams.sortBy}
      >
        <Search />
      </SearchContextProvider>
    </main>
  );
}
