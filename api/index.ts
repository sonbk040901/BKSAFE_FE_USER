import axios, { AxiosError } from "axios";
import { Driver, ErrorResponse, User } from "../types/domain";
import { getData, removeData } from "../utils/storage";
import { LocationType } from "../types/location";
export const BASE_URL = "http://192.168.5.148:3000/api/";
export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
axiosInstance.interceptors.request.use(async (config) => {
  const token = await getData("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
export const login = async (email: string, password: string) => {
  try {
    const response = await axiosInstance.post("auth/login", {
      email,
      password,
    });
    return response.data.data as User;
  } catch (error) {
    const err = <AxiosError<ErrorResponse>>error;
    throw err.response?.data.message;
  }
};
export const logout = async () => {
  removeData("token");
  removeData("user");
};
export const signup = async (
  email: string,
  username: string,
  fullname: string,
  phone: string,
  password: string,
) => {
  try {
    const response = await axiosInstance.post("auth/signup", {
      email,
      password,
      username,
      fullname,
      phone,
    });
    return response.data.data;
  } catch (error: unknown) {
    const err = <AxiosError<ErrorResponse>>error;
    throw err.response?.data.message;
  }
};
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const moocDriversData = [
  {
    _id: "1",
    username: "driver1",
    fullname: "Nguyễn Văn A",
    email: "leducson@gmail.com",
    phone: "0123456789",
    avatar: "https://i.pravatar.cc/150?img=1",
    isActivated: true,
    birthday: new Date(),
    address: "Hà Nội",
    starAvg: 4.5,
    lat: 21.02,
    lng: 105.8,
  },
  {
    _id: "2",
    username: "driver2",
    fullname: "Nguyễn Văn B",
    email: "  ",
    phone: "0123456789",
    avatar: "https://i.pravatar.cc/150?img=2",
    isActivated: true,
    birthday: new Date(),
    address: "Hà Nội",
    starAvg: 4.5,
    lat: 21.0277,
    lng: 105.834,
  },
  {
    _id: "3",
    username: "driver3",
    fullname: "Nguyễn Văn C",
    email: "  ",
    phone: "0123456789",
    avatar: "https://i.pravatar.cc/150?img=3",
    isActivated: true,
    birthday: new Date(),
    address: "Hà Nội",
    starAvg: 4.5,
    lat: 21.027763,
    lng: 105.83416,
  },
  {
    _id: "4",
    username: "driver4",
    fullname: "Nguyễn Văn D",
    email: "leducson@gmail.com",
    phone: "0123456789",
    avatar: "https://i.pravatar.cc/150?img=4",
    isActivated: true,
    birthday: new Date(),
    address: "Hà Nội",
    starAvg: 4.5,
    lat: 21.027763,
    lng: 105.83416,
  },
  {
    _id: "5",
    username: "driver5",
    fullname: "Nguyễn Văn E",
    email: "  ",
    phone: "0123456789",
    avatar: "https://i.pravatar.cc/150?img=5",
    isActivated: true,

    birthday: new Date(),
    address: "Hà Nội",
    starAvg: 4.5,
    lat: 21.027763,
    lng: 105.83416,
  },
];
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const findCarDrivers = async ({
  lat,
  lng,
}: {
  lat: number;
  lng: number;
}) => {
  try {
    const url = `map/drivers?lat=${lat}&lng=${lng}`;
    const response = await axiosInstance.get(url);
    const data = response.data.data as Driver[];
    return data as Driver[];
  } catch (error) {
    const err = <AxiosError<ErrorResponse>>error;
    throw err.response?.data.message;
  }
};
export type RecentRequest = {
  locations: LocationV2[];
  _id: string;
  id: string;
  price: number;
  driver?: Driver;
  status: "pending" | "accepted" | "driving" | "completed";
  createdAt: string;
};
export const getRecentRequests = async () => {
  try {
    const response = await axiosInstance.get("request/recents");
    const data = response.data.data as {
      recent?: RecentRequest & { status: "pending" | "accepted" | "driving" };
      completed?: RecentRequest & { status: "completed" };
    };
    if (data.recent?.id) data.recent.id = data.recent?._id;
    if (data.completed?.id) data.completed.id = data.completed?._id;
    return data;
  } catch (error) {
    const err = <AxiosError<ErrorResponse>>error;
    throw err.response?.data.message;
  }
};
type LatLng = {
  lat: number;
  lng: number;
};
type Location = {
  latLng: LatLng;
  address: string;
};
type Request = {
  currentLocation: Location;
  startLocation: Location;
  endLocation: Location;
  suggestedDriver: string[];
  driver: string;
};
export const createRequest = async (payload: Request) => {
  const url = "request";
  try {
    const user = await getData("user");
    const response = await axiosInstance.post(url, payload, {
      headers: { Authorization: `Bearer ${user.token}` },
    });
    return response.data.data;
  } catch (error) {
    const err = <AxiosError<ErrorResponse>>error;
    throw err.response?.data.message;
  }
};
type LocationV2 = { address: string; latitude: number; longitude: number };
type RequestV2 = {
  distance: number;
  pickup: LocationV2;
  dropOff: LocationV2;
  stops: LocationV2[];
};
export const createRequestV2 = async (payload: RequestV2) => {
  const url = "request/create";
  try {
    const response = await axiosInstance.post(url, payload);
    return response.data.data;
  } catch (error) {
    const err = <AxiosError<ErrorResponse>>error;
    throw err.response?.data.message;
  }
};
export const getAllRequests = async () => {
  try {
    const response = await axiosInstance.get("request");
    const data = response.data.data as RecentRequest[];
    return data.map((item) => {
      item.id = item._id;
      return item;
    });
  } catch (error) {
    const err = <AxiosError<ErrorResponse>>error;
    throw err.response?.data.message;
  }
};
export const getCost = async (distance: number, locations: LocationType[]) => {
  try {
    const response = await axiosInstance.post("map/driving-cost", {
      distance,
      positions: locations,
    });
    return response.data.data as number;
  } catch (error) {
    const err = <AxiosError<ErrorResponse>>error;
    throw err.response?.data.message;
  }
};
// eslint-disable-next-line @typescript-eslint/no-unused-vars
// export const findBikeDrivers = async (location: {
//   latitude: number;
//   longitude: number;
// }) => {
//   try {
//     const response = { data: moocDriversData };
//     // await axiosInstance.get("drivers/bike");
//     return response.data.data;
//   } catch (error: unknown) {
//     const err = <AxiosError<unknown, unknown>>error;
//     throw err.response?.data.message;
//   }
// };
