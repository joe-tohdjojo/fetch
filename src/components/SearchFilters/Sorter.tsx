'use client';

import { useContext } from 'react';
import { ArrowDownUp, ArrowUpDown } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from '@/components/ui/select';
import { SearchContext } from '@/context/SearchContext';
import { useRouter } from 'next/navigation';

export function Sorter({ className = '' }: { className?: string }) {
  const router = useRouter();
  const { state } = useContext(SearchContext);
  return (
    <div className="flex flex-col gap-2 sm:flex-row">
      <Select
        onValueChange={(value) =>
          router.push(
            `/search?page=1&breed=${state.filters.breed}&sortBy=${value}&sort=asc`,
          )
        }
      >
        <SelectTrigger className={className}>
          {`${state.filters.sortBy[0].toUpperCase()}${state.filters.sortBy.slice(1)}` ||
            'Sort by'}
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
            `/search?page=1&breed=${state.filters.breed}&sortBy=${state.filters.sortBy}&sort=${state.filters.sort === 'asc' ? 'desc' : 'asc'}`,
          )
        }
        variant="secondary"
      >
        {state.filters.sort === 'asc' ? <ArrowUpDown /> : <ArrowDownUp />}
      </Button>
    </div>
  );
}
