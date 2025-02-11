'use client';

import { createContext, Dispatch, useReducer } from 'react';

import { dogReducer, LOCAL_STORAGE_KEY } from '@/context/reducers';

/**
 * Retrieves favorites from local storage
 * @returns {Object} Object containing favorite dogs, empty object if no favorites or not in browser context
 */
const getFavoritesFromStorage = () => {
  if (typeof window === 'undefined') return {};
  return JSON.parse(window.localStorage.getItem(LOCAL_STORAGE_KEY) || '{}');
};

const initialState = {
  favorites: getFavoritesFromStorage(),
};

export const GlobalStateContext = createContext<{
  state: StateType;
  dispatch: Dispatch<ActionType>;
}>({
  state: initialState,
  dispatch: () => {},
});

/**
 * Provider component for the Search context. The component reacts to changes to the url query parameters and re-fetches the dog data
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components
 * @param {number} [props.page=1] - Current page number
 * @param {string} [props.breed='All+breeds'] - Selected breed filter
 * @param {'asc'|'desc'} [props.sort='asc'] - Sort direction
 * @param {'age'|'breed'|'name'} [props.sortBy='breed'] - Field to sort by
 * @returns {JSX.Element} Search context provider component
 */
export function GlobalStateContextProvider({
  children,
}: {
  children: Readonly<React.ReactNode>;
}) {
  const [state, dispatch] = useReducer(dogReducer, initialState);

  return (
    <GlobalStateContext.Provider
      value={{
        state: {
          favorites: { ...state.favorites },
        },
        dispatch,
      }}
    >
      {children}
    </GlobalStateContext.Provider>
  );
}
