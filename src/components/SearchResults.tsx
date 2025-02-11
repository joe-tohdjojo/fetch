'use client';

import { useContext } from 'react';
import Image from 'next/image';
import { Star } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { GlobalStateContext } from '@/context/GlobalStateContext';
import { TOGGLE_FAVORITE_DOG } from '@/context/reducers';

/**
 * Renders a list of dog cards with their information and favorite status
 * @param {Object} props - Component props
 * @param {Dog[]} props.data - Array of dog objects to display
 * @returns {JSX.Element[]} Array of dog card components
 */
export function SearchResults({ data }: { data: Dog[] }) {
  const { state, dispatch } = useContext(GlobalStateContext);

  return data?.map((dog: Dog) => {
    return (
      <Card
        key={dog.id}
        className={cn('w-[300px] hover:cursor-pointer', {
          'border-primary': state.favorites[dog.id],
        })}
        onClick={() => {
          if (
            Object.entries(state.favorites).length < 100 ||
            state.favorites[dog.id]
          )
            dispatch({
              type: TOGGLE_FAVORITE_DOG,
              payload: { dogId: dog.id },
            });
        }}
      >
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-xl">{dog.name}</CardTitle>
          <Star
            className={cn('h-6 w-6', {
              'fill-primary': state.favorites[dog.id],
            })}
          />
        </CardHeader>
        <CardContent className="flex flex-col gap-2">
          <AspectRatio
            ratio={1 / 1}
            className="bg-muted"
          >
            <Image
              className="h-full w-full rounded object-cover"
              src={dog.img}
              alt={dog.name}
              fill
              sizes="200px"
            />
          </AspectRatio>
          <p>
            <span className="font-bold">Breed:</span> {dog.breed}
          </p>
          <p>
            <span className="font-bold">Age:</span> {dog.age}
          </p>
          <p>
            <span className="font-bold">Zip Code:</span> {dog.zip_code}
          </p>
        </CardContent>
      </Card>
    );
  });
}
