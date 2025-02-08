'use client';

import { useContext } from 'react';

import { BreedSelector } from '@/components/SearchFilters/BreedSelector';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { CLEAR_FAVORITES } from '@/context/reducers';
import { MatchModal } from '@/components/MatchModal';
import { Pagination } from '@/components/Pagination';
import { SearchContext } from '@/context/SearchContext';
import { Sorter } from '@/components/SearchFilters/Sorter';

export function SearchFilters() {
  const { state, dispatch } = useContext(SearchContext);
  const favoritesCount = Object.entries(state.favorites).length;

  return (
    <div className="sticky top-4 z-10 flex w-full flex-col gap-2">
      {Object.entries(state.favorites).length > 0 && (
        <Card className="fixed bottom-4 flex flex-col gap-2 p-2">
          <div className="flex w-full flex-col items-center gap-2">
            {favoritesCount === 0 ? (
              'Select your favorite dogs'
            ) : (
              <div>
                You favorited{' '}
                <span className="font-bold">{favoritesCount}</span> dogs.
              </div>
            )}
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
        </Card>
      )}
      <Card className="flex flex-col justify-between gap-4 p-2 sm:flex-row">
        <BreedSelector className="self-start" />
        <Sorter />
        <Pagination href="/search" />
      </Card>
    </div>
  );
}
