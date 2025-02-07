'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Star } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AspectRatio } from '@/components/ui/aspect-ratio';

interface Dog {
  id: string;
  img: string;
  name: string;
  age: number;
  zip_code: string;
  breed: string;
}

export function SearchResults({ data }: { data: Dog[] }) {
  const [favorites, setFavorites] = useState<{ [key: string]: boolean }>({});

  return data?.map(
    (dog: {
      img: string;
      name: string;
      id: string;
      breed: string;
      age: number;
      zip_code: string;
    }) => {
      return (
        <Card
          key={dog.id}
          className={cn('w-[300px] hover:cursor-pointer', {
            'border-primary': favorites[dog.id],
          })}
          onClick={() =>
            setFavorites((prev) => {
              if (prev[dog.id]) {
                const newState = { ...prev };
                delete newState[dog.id];
                return newState;
              } else {
                return { ...prev, [dog.id]: true };
              }
            })
          }
        >
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-xl">{dog.name}</CardTitle>
            <Star
              className={cn('h-6 w-6', {
                'fill-white': favorites[dog.id],
              })}
            />
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            <AspectRatio
              ratio={1 / 1}
              className="bg-muted"
            >
              <Image
                className="h-full w-full object-cover"
                src={dog.img}
                alt={dog.name}
                fill
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
    },
  );
}
