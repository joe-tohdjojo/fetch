export type FetchDogIDsOptions = {
  breed: string | null;
  page: number;
  sort: 'asc' | 'desc';
  sortBy: 'age' | 'breed' | 'name';
};

/**
 * Fetches dog IDs based on search parameters with built-in pagination
 * @param {FetchDogIDsOptions} options - Search and pagination options
 * @param {string|null} options.breed - Optional breed filter
 * @param {number} options.page - Page number for pagination
 * @param {'asc'|'desc'} options.sort - Sort direction
 * @param {'age'|'breed'|'name'} options.sortBy - Field to sort by
 * @returns {Promise<{ data: { resultIds: string[], total: number, totalPages: number }, error: any }>} Dog IDs and pagination info
 */
export const fetchDogIds = (() => {
  let total = 10000;
  return async ({
    page,
    breed,
    sort = 'asc',
    sortBy = 'breed',
  }: FetchDogIDsOptions) => {
    const defaultSize = 24;
    const from = (page - 1) * defaultSize;
    const size = Math.min(defaultSize, total - from);
    const s = `${sortBy}:${sort}`;

    const queryParams = {
      sort: s,
      size,
      from,
      breeds: breed,
    } as const;
    const searchStr = Object.entries(queryParams).reduce(
      (acc, [key, value]) => {
        if (!value) return acc;
        const str = `${key}=${value}`;
        if (acc.length === 0) {
          return str;
        }
        return `${acc}&${str}`;
      },
      '',
    );
    const url = encodeURI(
      `${process.env.NEXT_PUBLIC_BASE_URL}/dogs/search?${searchStr}`,
    );

    const response = await fetch(url, {
      credentials: 'include',
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
    });

    if (!response.ok) {
      return {
        data: null,
        error: {
          status: response.status,
          message: response.statusText,
        },
      };
    }

    const data = await response.json();
    total = data.total;
    return {
      data: {
        ...data,
        totalPages:
          data.total % defaultSize > 0
            ? Math.ceil(data.total / defaultSize)
            : data.total / defaultSize,
      },
      error: null,
    };
  };
})();

/**
 * Fetches detailed dog information for given dog IDs
 * @param {string[]} dogIds - Array of dog IDs to fetch
 * @returns {Promise<{ data: Dog[], error: any }>} Array of dog objects with their details
 */
export const fetchDogs = async (dogIds: string[]) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/dogs`, {
    body: JSON.stringify(dogIds),
    credentials: 'include',
    method: 'POST',
    headers: new Headers({
      'Content-Type': 'application/json',
    }),
  });

  if (!response.ok) {
    return {
      data: null,
      error: {
        status: response.status,
        message: response.statusText,
      },
    };
  }

  const dogsData = await response.json();

  return { data: dogsData, error: null };
};

/**
 * Fetches list of all available dog breeds
 * @returns {Promise<{ data: string[], error: any }>} Array of dog breed names
 */
export const fetchDogBreeds = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/dogs/breeds`,
    {
      credentials: 'include',
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
    },
  );

  if (!response.ok) {
    return {
      data: null,
      error: {
        status: response.status,
        message: response.statusText,
      },
    };
  }

  const data = await response.json();

  return { data, error: null };
};

/**
 * Fetches a dog match based on favorited dog IDs
 * @param {Object} options - Options object
 * @param {string[]} options.dogIds - Array of dog IDs to find a match from
 * @returns {Promise<Dog>} Matched dog object
 * @throws {Error} If the match request fails
 */
export const fetchDogMatch = async ({ dogIds }: { dogIds: string[] }) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/dogs/match`,
    {
      body: JSON.stringify(dogIds),
      credentials: 'include',
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
    },
  );

  if (!response.ok) {
    return {
      data: null,
      error: {
        status: response.status,
        message: response.statusText,
      },
    };
  }

  const data = await response.json();

  return { data, error: null };
};
