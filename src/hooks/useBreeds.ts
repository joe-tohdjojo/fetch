import { useQuery } from '@tanstack/react-query';

import { fetchDogBreeds } from '@/lib/fetchDogStuff';

/**
 * Fetches all available dog breeds
 * @returns {Promise<string[]>} Array of dog breeds
 * @throws {Error} If the API request fails
 */
const getBreeds = async () => {
  const { data, error } = await fetchDogBreeds();

  if (error) {
    throw new Error(
      error.status === 401 ? '401 Unauthorized' : error.status.toString(),
    );
  }

  return data;
};

export const useBreeds = () => {
  return useQuery({
    queryKey: ['dogBreeds'],
    queryFn: getBreeds,
  });
};
