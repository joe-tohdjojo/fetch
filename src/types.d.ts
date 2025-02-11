type Dog = {
  id: string;
  img: string;
  name: string;
  age: number;
  zip_code: string;
  breed: string;
};

type StateType = {
  favorites: { [id: string]: boolean };
};

type ActionType = {
  type: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  payload: { [key: string]: any };
};
