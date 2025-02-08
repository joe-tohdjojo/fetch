export type FetchDogIDsOptions = {
  page: number;
  breed: string | null;
};

export const fetchDogIds = (() => {
  let total = 10000;
  return async ({ page, breed }: FetchDogIDsOptions) => {
    const defaultSize = 24;
    const from = (page - 1) * defaultSize;
    const size = Math.min(defaultSize, total - from);

    const queryParams = {
      size,
      from,
      breeds: breed,
    } as const;

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/dogs/search?${Object.entries(
        queryParams,
      ).reduce((acc, [key, value]) => {
        if (!value) return acc;
        const str = `${key}=${value}`;
        if (acc.length === 0) {
          return str;
        }
        return `${acc}&${str}`;
      }, '')}`,
      {
        credentials: 'include',
        method: 'GET',
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

export const fetchDogs = async (dogIds: string[]) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/dogs`, {
    body: JSON.stringify(dogIds),
    credentials: 'include',
    method: 'POST',
    headers: new Headers({
      accept: 'application/json',
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

export const fetchDogBreeds = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/dogs/breeds`,
    {
      credentials: 'include',
      method: 'GET',
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
