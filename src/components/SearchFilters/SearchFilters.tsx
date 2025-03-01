'use client';

import { useContext } from 'react';

import { BreedSelector } from '@/components/SearchFilters/BreedSelector';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { CLEAR_FAVORITES } from '@/context/reducers';
import { MatchModal } from '@/components/MatchModal';
import { Pagination } from '@/components/Pagination';
import { GlobalStateContext } from '@/context/GlobalStateContext';
import { Sorter } from '@/components/SearchFilters/Sorter';

/**
 * Component for rendering search filters
 * @returns {JSX.Element} Search filters component
 */
export function SearchFilters() {
  const { state, dispatch } = useContext(GlobalStateContext);
  const favoritesCount = Object.entries(state.favorites).length;

  return (
    <div className="sticky top-4 z-10 flex w-full flex-col gap-2">
      <Card className="fixed bottom-4 flex flex-col gap-2 p-2">
        {favoritesCount > 0 ? (
          <div className="flex w-full flex-col items-center gap-2">
            <div>
              You favorited{' '}
              {favoritesCount === 100 ? 'the maximum count of ' : ' '}
              <span className="font-bold">{favoritesCount}</span> dogs.
            </div>
            <div className="flex gap-2">
              <MatchModal />
              <Button
                variant="destructive"
                onClick={() => {
                  dispatch({
                    type: CLEAR_FAVORITES,
                    payload: {},
                  });
                }}
              >
                Clear your favorites
              </Button>
            </div>
          </div>
        ) : (
          <p className="text-xl font-bold">
            Click on a dog card to add it to your favorites
          </p>
        )}
      </Card>
      <Card className="flex flex-col justify-between gap-4 p-2 sm:flex-row">
        <BreedSelector className="self-start" />
        <Sorter />
        <Pagination href="/search" />
      </Card>
    </div>
  );
}
