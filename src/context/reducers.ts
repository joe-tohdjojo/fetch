export const SET_DOGS = 'SET_DOGS';
export const SET_BREEDS = 'SET_BREEDS';
export const SET_BREED_FILTER = 'SET_BREED_FILTER';
export const TOGGLE_FAVORITE_DOG = 'TOGGLE_FAVORITE_DOG';
export const CLEAR_FAVORITES = 'CLEAR_FAVORITES';

export const dogReducer = (
  state: StateType,

  action: ActionType,
): StateType => {
  switch (action.type) {
    case SET_DOGS:
      return {
        ...state,
        dogs: action.payload.dogs,
        query: {
          currentPage: action.payload.query.page,
          isLoading: action.payload.query.isLoading,
          isError: action.payload.query.isError,
          totalPages: action.payload.query.totalPages,
        },
      };
    case SET_BREEDS:
      return {
        ...state,
        breeds: action.payload.breeds,
      };

    case SET_BREED_FILTER:
      return {
        ...state,
        query: {
          ...state.query,
          currentPage: 1,
        },
        filters: {
          ...state.filters,
          breed: action.payload.breed,
        },
      };

    case TOGGLE_FAVORITE_DOG:
      const newFavorites = { ...state.favorites };

      if (newFavorites[action.payload.dogId]) {
        delete newFavorites[action.payload.dogId];
      } else {
        newFavorites[action.payload.dogId] = true;
      }

      if (typeof window !== 'undefined') {
        window.localStorage.setItem(
          'dogFavorites',
          JSON.stringify(newFavorites),
        );
      }

      return {
        ...state,
        favorites: newFavorites,
      };
    case CLEAR_FAVORITES:
      return {
        ...state,
        favorites: {},
      };
    default:
      return state;
  }
};
