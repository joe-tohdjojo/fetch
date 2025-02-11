'use client';

import { useRouter } from 'next/navigation';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectGroup,
} from '@/components/ui/select';
import { useBreeds } from '@/hooks/useBreeds';
import { useFilters } from '@/hooks/useFilters';

/**
 * Component for selecting dog breeds with a dropdown
 * @param {Object} props - Component props
 * @param {string} [props.className=''] - Additional CSS classes
 * @returns {JSX.Element} Breed selector component
 */
export function BreedSelector({ className = '' }: { className?: string }) {
  const { breed, sort, sortBy } = useFilters();
  const router = useRouter();
  const { data } = useBreeds();

  return data?.length === 0 ? null : (
    <Select
      onValueChange={(value) =>
        router.push(
          `/search?page=1&breed=${value}&sort=${sort}&sortBy=${sortBy}`,
        )
      }
      value={breed}
    >
      <SelectTrigger className={className}>{breed}</SelectTrigger>
      <SelectContent>
        <SelectGroup className="border-b">
          <SelectItem value="All breeds">All breeds</SelectItem>
        </SelectGroup>
        {data?.map((breed: string) => (
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
