import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Skeleton } from '@/components/ui/skeleton';

export function SearchResultsSkeleton() {
  return Array(24)
    .fill(undefined)
    .map((el, i) => {
      return (
        <Card
          key={i}
          className="w-[300px]"
        >
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="w-full">
              <Skeleton className="h-10 w-5/12" />
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            <AspectRatio
              ratio={1 / 1}
              className="rounded"
            >
              <Skeleton className="h-full w-full rounded" />
            </AspectRatio>
            <Skeleton className="h-6 w-10/12" />
            <Skeleton className="h-6 w-7/12" />
            <Skeleton className="h-6 w-11/12" />
          </CardContent>
        </Card>
      );
    });
}
