'use client';

import { useRouter } from 'next/navigation';
import { ArrowDownUp, ArrowUpDown } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from '@/components/ui/select';
import { useFilters } from '@/hooks/useFilters';
import { useState } from 'react';

/**
 * Component for sorting dog results by different criteria
 * @param {Object} props - Component props
 * @param {string} [props.className=''] - Additional CSS classes
 * @returns {JSX.Element} Sorter component
 */
export function Sorter({ className = '' }: { className?: string }) {
  const { breed, sortBy, sort } = useFilters();
  const [sorter, setSorter] = useState<'age' | 'breed' | 'name'>(sortBy);
  const router = useRouter();

  return (
    <div className="flex flex-col gap-2 sm:flex-row">
      <Select
        value={sorter}
        onValueChange={(value) => {
          setSorter(value as 'age' | 'breed' | 'name');
          router.push(`/search?page=1&breed=${breed}&sortBy=${value}&sort=asc`);
        }}
      >
        <SelectTrigger className={className}>
          {`${sortBy[0].toUpperCase()}${sortBy.slice(1)}` || 'Sort by'}
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="age">Age</SelectItem>
          <SelectItem value="breed">Breed</SelectItem>
          <SelectItem value="name">Name</SelectItem>
        </SelectContent>
      </Select>
      <Button
        onClick={() =>
          router.push(
            `/search?page=1&breed=${breed}&sortBy=${sortBy}&sort=${sort === 'asc' ? 'desc' : 'asc'}`,
          )
        }
        variant="secondary"
      >
        {sort === 'asc' ? <ArrowUpDown /> : <ArrowDownUp />}
      </Button>
    </div>
  );
}
