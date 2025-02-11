import { Search } from '@/components/Search';
import { GlobalStateContextProvider } from '@/context/GlobalStateContext';

/**
 * Search page component that displays the dog search interface
 * @returns {JSX.Element} Search page component
 */
export default async function SearchPage() {
  return (
    <main className="mb-36 mt-8 flex h-full flex-col items-center gap-8 px-4">
      <GlobalStateContextProvider>
        <Search />
      </GlobalStateContextProvider>
    </main>
  );
}
