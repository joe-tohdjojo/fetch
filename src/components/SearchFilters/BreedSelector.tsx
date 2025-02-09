'use client';

import { useContext } from 'react';
import { useRouter } from 'next/navigation';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectGroup,
} from '@/components/ui/select';
import { SearchContext } from '@/context/SearchContext';

/**
 * Component for selecting dog breeds with a dropdown
 * @param {Object} props - Component props
 * @param {string} [props.className=''] - Additional CSS classes
 * @returns {JSX.Element} Breed selector component
 */
export function BreedSelector({ className = '' }: { className?: string }) {
  const { state } = useContext(SearchContext);
  const router = useRouter();

  return state.breeds?.length === 0 ? null : (
    <Select
      onValueChange={(value) =>
        router.push(
          `/search?page=1&breed=${value}&sort=${state.filters.sort}&sortBy=${state.filters.sortBy}`,
        )
      }
      value={state.filters.breed || 'All breeds'}
    >
      <SelectTrigger className={className}>{state.filters.breed}</SelectTrigger>
      <SelectContent>
        <SelectGroup className="border-b">
          <SelectItem value="All breeds">All breeds</SelectItem>
        </SelectGroup>
        {state.breeds?.map((breed: string) => (
          <SelectItem
            key={breed}
            value={breed}
          >
            {breed}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
