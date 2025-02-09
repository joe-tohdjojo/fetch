'use client';

import { useContext } from 'react';

import {
  Pagination as P,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { SearchContext } from '@/context/SearchContext';

/**
 * Component for rendering pagination
 * @param {Object} props - Component props
 * @param {string} props.href - URL to link to
 * @returns {JSX.Element} Pagination component
 */
export function Pagination({ href }: { href: string }) {
  const {
    state: {
      filters: { breed, sort, sortBy },
      query: { currentPage, totalPages: total },
    },
  } = useContext(SearchContext);

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
        <PaginationItem className={currentPage < total ? 'flex' : 'invisible'}>
          <PaginationLink
            href={`${href}?page=${currentPage + 1}${breed ? `&breed=${breed}` : ''}&sort=${sort}&sortBy=${sortBy}`}
          >
            {currentPage + 1}
          </PaginationLink>
        </PaginationItem>
        <PaginationItem className={currentPage < total ? 'flex' : 'invisible'}>
          <PaginationNext
            href={`${href}?page=${currentPage + 1}${breed ? `&breed=${breed}` : ''}&sort=${sort}&sortBy=${sortBy}`}
          />
        </PaginationItem>
      </PaginationContent>
    </P>
  );
}
