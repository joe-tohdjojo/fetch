import { fetchDogMatch, fetchDogs } from '@/lib/fetchDogStuff';
import { useMutation } from '@tanstack/react-query';

/**
 * Fetches a dog match based on favorited dog IDs
 * @param {Object} options - Options object
 * @param {string[]} options.dogIds - Array of dog IDs to find a match from
 * @returns {Promise<Dog>} Matched dog object
 * @throws {Error} If the match request fails
 */
const getDogMatch = async ({ dogIds }: { dogIds: string[] }) => {
  const { data: dogMatchData, error: dogMatchError } = await fetchDogMatch({
    dogIds,
  });
  if (dogMatchError) {
    throw new Error(dogMatchError.message);
  }

  const { data: dogsData, error: dogsError } = await fetchDogs([
    dogMatchData.match,
  ]);

  if (dogsError) {
    throw new Error(dogsError.message);
  }

  return dogsData[0];
};

interface Options {
  dogIds: string[];
  onError?: (err: Error) => void;
  onSuccess?: (value: Dog) => void;
}

export const useDogMatch = ({
  dogIds,
  onError = () => {},
  onSuccess = () => {},
}: Options) => {
  return useMutation({
    mutationFn: async () => await getDogMatch({ dogIds }),
    onSuccess,
    onError,
  });
};
