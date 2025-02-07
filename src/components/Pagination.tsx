import {
  Pagination as P,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

export function Pagination({
  href,
  currentPage,
  total,
}: {
  href: string;
  currentPage: number;
  total: number;
}) {
  return (
    <P>
      <PaginationContent className="flex w-[300px] items-center justify-center">
        <PaginationItem className={currentPage > 1 ? 'flex' : 'invisible'}>
          <PaginationPrevious href={`${href}?page=${currentPage - 1}`} />
        </PaginationItem>
        <PaginationItem className={currentPage > 1 ? 'flex' : 'invisible'}>
          <PaginationLink href={`${href}?page=${currentPage - 1}`}>
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
          <PaginationLink href={`${href}?page=${currentPage + 1}`}>
            {currentPage + 1}
          </PaginationLink>
        </PaginationItem>
        <PaginationItem className={currentPage < total ? 'flex' : 'invisible'}>
          <PaginationNext href={`${href}?page=${currentPage + 1}`} />
        </PaginationItem>
      </PaginationContent>
    </P>
  );
}
