'use client';

import { createContext, Dispatch, useEffect, useReducer } from 'react';
import { useRouter } from 'next/navigation';
import { queryOptions, useQuery } from '@tanstack/react-query';

import {
  dogReducer,
  LOCAL_STORAGE_KEY,
  SET_BREEDS,
  SET_DOGS,
} from '@/context/reducers';
import {
  fetchDogBreeds,
  fetchDogIds,
  FetchDogIDsOptions,
  fetchDogs,
} from '@/lib/fetchDogStuff';

const getFavoritesFromStorage = () => {
  if (typeof window === 'undefined') return {};
  return JSON.parse(window.localStorage.getItem(LOCAL_STORAGE_KEY) || '{}');
};

const initialState = {
  dogs: [],
  breeds: [],
  favorites: getFavoritesFromStorage(),
  filters: {
    sort: 'asc' as 'asc' | 'desc',
    sortBy: 'breed' as 'age' | 'breed' | 'name',
    breed: null,
  },
  query: {
    currentPage: 1,
    isLoading: false,
    isError: false,
    totalPages: 500,
    error: { message: '' },
  },
};

const getDogs = async ({ breed, page, sort, sortBy }: FetchDogIDsOptions) => {
  const { data: dogIdsData, error: dogIdsError } = await fetchDogIds({
    breed,
    page,
    sort,
    sortBy,
  });
  if (dogIdsError) {
    return { data: null, error: dogIdsError };
  }

  const { data: dogsData, error: dogsError } = await fetchDogs(
    dogIdsData.resultIds,
  );

  if (dogsError) {
    return { data: null, error: dogsError };
  }
  return {
    data: { dogs: dogsData, totalPages: dogIdsData.totalPages },
    error: null,
  };
};

const dogOptions = ({ page, breed, sort, sortBy }: FetchDogIDsOptions) => {
  return queryOptions({
    queryKey: ['dogs', page, breed, sort, sortBy],
    queryFn: () => getDogs({ page, breed, sort, sortBy }),
  });
};

const dogBreedOptions = () => {
  return queryOptions({
    queryKey: ['dogBreeds'],
    queryFn: fetchDogBreeds,
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};

export const SearchContext = createContext<{
  state: StateType;
  dispatch: Dispatch<ActionType>;
}>({
  state: initialState,
  dispatch: () => {},
});
export const SearchContextDispatch = createContext(() => {});

export function SearchContextProvider({
  children,
  page = 1,
  breed = 'All+breeds',
  sort = 'asc',
  sortBy = 'breed',
}: {
  children: Readonly<React.ReactNode>;
  page?: number;
  breed?: string;
  sort?: 'asc' | 'desc';
  sortBy?: 'age' | 'breed' | 'name';
}) {
  const [state, dispatch] = useReducer(dogReducer, initialState);
  const router = useRouter();
  const { data, error, isError, isLoading } = useQuery(
    dogOptions({
      page,
      breed: decodeURIComponent(breed) !== 'All breeds' ? breed : null,
      sort,
      sortBy,
    }),
  );
  const { data: breedData } = useQuery(dogBreedOptions());

  useEffect(() => {
    dispatch({
      type: SET_DOGS,
      payload: {
        dogs: data?.data?.dogs,
        filters: { breed, sort, sortBy },
        query: {
          currentPage: page,
          isLoading,
          isError,
          totalPages: data?.data?.totalPages,
          error,
        },
      },
    });
  }, [
    breed,
    data?.data?.dogs,
    data?.data?.totalPages,
    error,
    isError,
    isLoading,
    page,
    sort,
    sortBy,
  ]);

  useEffect(() => {
    if (!breedData) return;
    dispatch({
      type: SET_BREEDS,
      payload: {
        breeds: breedData.data,
      },
    });
  }, [breedData]);

  if (data?.error && data.error.status === 401) {
    router.push('/login');
  }

  return (
    <SearchContext.Provider
      value={{
        state: {
          ...state,
          filters: {
            ...state.filters,
            breed,
          },
          query: { ...state.query, currentPage: page, isLoading, isError },
          favorites: { ...state.favorites },
        },
        dispatch,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
}
