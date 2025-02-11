'use client';

import { useEffect, useState } from 'react';

import {
  Pagination as P,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { useFilters } from '@/hooks/useFilters';
import { useDogs } from '@/hooks/useDogs';

/**
 * Component for rendering pagination
 * @param {Object} props - Component props
 * @param {string} props.href - URL to link to
 * @returns {JSX.Element} Pagination component
 */
export function Pagination({ href }: { href: string }) {
  const [totalPages, setTotalPages] = useState(500);
  const { breed, page: currentPage, sort, sortBy } = useFilters();
  const { data } = useDogs({
    page: currentPage,
    breed,
    sort,
    sortBy,
  });
  useEffect(() => {
    if (data?.totalPages !== totalPages) setTotalPages(totalPages);
  }, [data?.totalPages, totalPages, setTotalPages]);

  return (
    <P className="mx-0 justify-end">
      <PaginationContent className="flex w-[300px] items-center justify-center">
        <PaginationItem className={currentPage > 1 ? 'flex' : 'invisible'}>
          <PaginationPrevious
            href={`${href}?page=${currentPage - 1}${breed ? `&breed=${breed}` : ''}&sort=${sort}&sortBy=${sortBy}`}
          />
        </PaginationItem>
        <PaginationItem className={currentPage > 1 ? 'flex' : 'invisible'}>
          <PaginationLink
            href={`${href}?page=${currentPage - 1}${breed ? `&breed=${breed}` : ''}&sort=${sort}&sortBy=${sortBy}`}
          >
            {currentPage - 1}
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink
            href="#"
            isActive
          >
            {currentPage}
          </PaginationLink>
        </PaginationItem>
        <PaginationItem
          className={currentPage < totalPages ? 'flex' : 'invisible'}
        >
          <PaginationLink
            href={`${href}?page=${currentPage + 1}${breed ? `&breed=${breed}` : ''}&sort=${sort}&sortBy=${sortBy}`}
          >
            {currentPage + 1}
          </PaginationLink>
        </PaginationItem>
        <PaginationItem
          className={currentPage < totalPages ? 'flex' : 'invisible'}
        >
          <PaginationNext
            href={`${href}?page=${currentPage + 1}${breed ? `&breed=${breed}` : ''}&sort=${sort}&sortBy=${sortBy}`}
          />
        </PaginationItem>
      </PaginationContent>
    </P>
  );
}
