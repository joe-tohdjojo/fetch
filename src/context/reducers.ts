export const SET_DOGS = 'SET_DOGS';
export const SET_BREEDS = 'SET_BREEDS';
export const SET_BREED_FILTER = 'SET_BREED_FILTER';
export const TOGGLE_SORT_FILTER = 'TOGGLE_SORT_FILTER';
export const TOGGLE_FAVORITE_DOG = 'TOGGLE_FAVORITE_DOG';
export const CLEAR_FAVORITES = 'CLEAR_FAVORITES';

export const LOCAL_STORAGE_KEY = 'dogFavorites';

/**
 * Reducer function for managing dog-related state
 * @param {StateType} state - Current state
 * @param {ActionType} action - Action to be performed
 * @returns {StateType} New state after applying the action
 */
export const dogReducer = (state: StateType, action: ActionType): StateType => {
  switch (action.type) {
    case SET_DOGS:
      return { ...state, ...action.payload };
    case SET_BREEDS:
      return { ...state, breeds: action.payload.breeds };
    case SET_BREED_FILTER:
      return {
        ...state,
        query: { ...state.query, currentPage: 1 },
        filters: { ...state.filters, breed: action.payload.breed },
      };
    case TOGGLE_SORT_FILTER:
      return {
        ...state,
        query: { ...state.query, currentPage: 1 },
        filters: {
          ...state.filters,
          sort: state.filters.sort === 'asc' ? 'desc' : 'asc',
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
          LOCAL_STORAGE_KEY,
          JSON.stringify(newFavorites),
        );
      }
      return { ...state, favorites: newFavorites };
    case CLEAR_FAVORITES:
      window.localStorage.removeItem(LOCAL_STORAGE_KEY);
      return { ...state, favorites: {} };
    default:
      return state;
  }
};
