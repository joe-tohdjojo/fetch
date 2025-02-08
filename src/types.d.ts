type Dog = {
  id: string;
  img: string;
  name: string;
  age: number;
  zip_code: string;
  breed: string;
};

type StateType = {
  dogs: Dog[];
  breeds: string[];
  favorites: { [id: string]: boolean };
  filters: {
    breed: string | null;
  };
  query: {
    currentPage: number;
    isLoading: boolean;
    isError: boolean;
    totalPages: number;
    error?: { message: string };
  };
};

type ActionType = {
  type: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  payload: { [key: string]: any };
};
