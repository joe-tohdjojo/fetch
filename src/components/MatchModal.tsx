'use client';

import { useContext, useState } from 'react';
import Image from 'next/image';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { GlobalStateContext } from '@/context/GlobalStateContext';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Skeleton } from './ui/skeleton';
import { useToast } from '@/hooks/use-toast';
import { useDogMatch } from '@/hooks/useDogMatch';

/**
 * Modal component that displays a matched dog from favorites
 * Allows users to generate matches from their favorited dogs
 * @returns {JSX.Element} Match modal component
 */
export function MatchModal() {
  const [dog, setDog] = useState<Dog | null>(null);
  const { state } = useContext(GlobalStateContext);
  const { toast } = useToast();
  const mutation = useDogMatch({
    dogIds: Object.keys(state.favorites),
    onSuccess(value) {
      setDog(value);
    },
    onError(err) {
      toast({ description: err.message });
    },
  });

  const handleClick = async () => await mutation.mutate();

  return (
    <Dialog
      onOpenChange={(open) => {
        if (!open) setDog(null);
      }}
    >
      <DialogTrigger asChild>
        <Button onClick={handleClick}>Find your match</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-xl">
            Congratulations. You found a match!
          </DialogTitle>
        </DialogHeader>
        {
          <div className="grid gap-4 py-4">
            {dog ? <h2>{dog.name}</h2> : <Skeleton className="h-10 w-5/12" />}
            <AspectRatio ratio={1 / 1}>
              {dog ? (
                <Image
                  className="rounded-lg object-cover"
                  src={dog.img}
                  alt={dog.name}
                  fill
                  sizes="250px"
                />
              ) : (
                <Skeleton className="h-full w-full rounded" />
              )}
            </AspectRatio>
            {dog ? (
              <>
                <p>
                  <span className="font-bold">Breed:</span> {dog.breed}
                </p>
                <p>
                  <span className="font-bold">Age:</span> {dog.age}
                </p>
                <p>
                  <span className="font-bold">Zip Code:</span> {dog.zip_code}
                </p>
              </>
            ) : (
              <>
                <Skeleton className="h-6 w-10/12" />
                <Skeleton className="h-6 w-7/12" />
                <Skeleton className="h-6 w-11/12" />
              </>
            )}
          </div>
        }
      </DialogContent>
    </Dialog>
  );
}
