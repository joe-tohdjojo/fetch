import { useSearchParams } from 'next/navigation';

export const useFilters = () => {
  const searchParams = useSearchParams();
  const page = searchParams.get('page');
  return {
    page: page ? Number(page) : 1,
    breed: searchParams.get('breed') || 'All breeds',
    sort: (searchParams.get('sort') || 'asc') as 'asc' | 'desc',
    sortBy: (searchParams.get('sortBy') || 'breed') as 'age' | 'breed' | 'name',
  };
};
