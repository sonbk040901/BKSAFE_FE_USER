export type User = {
  id: string;
  username: string;
  fullname: string;
  email: string;
  phone: string;
  token: string;
  createdAt: string;
  updatedAt: string;
};
export type Driver = {
  _id: string;
  username: string;
  fullname: string;
  email: string;
  phone: string;
  avatar?: string;
  isActivated: boolean;
  birthday: Date;
  address: string;
  starAvg: number;
  lat: number;
  lng: number;
};
export type ErrorResponse<T = unknown> = {
  message: string;
  type: string;
  data: T;
};
