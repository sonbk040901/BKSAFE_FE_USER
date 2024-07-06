import instance from "./axios";
import {
  Booking,
  BookingStatus,
  PagingAndSortDto,
  PagingAndSortResponse,
} from "./types";
interface LocationDTO {
  address: string;
  latitude: number;
  longitude: number;
}
export interface BookingDTO {
  distance: number;
  pickup: LocationDTO;
  dropOff: LocationDTO;
  stops: LocationDTO[];
  note?: string;
  notes?: number[];
}
export interface FindAllBookingDTO extends PagingAndSortDto {
  status?: BookingStatus;
  time?: string;
}

export interface CreateRatingDTO {
  bookingId: number;
  rating: number;
  review?: string;
}

export interface RecentsBookingResponse {
  current: Nullable<Booking>;
  recent: Nullable<Booking>;
}

export const getAll = async (findAll: Type<FindAllBookingDTO>) => {
  const path = "bookings";
  const res = await instance.get<PagingAndSortResponse<Booking>>(path, {
    params: findAll,
  });
  return res.data;
};
export const getOne = async (id: number) => {
  const path = `bookings/${id}`;
  const res = await instance.get<Required<Booking>>(path);
  return res.data;
};
export const create = async (booking: BookingDTO) => {
  const path = "bookings";
  const res = await instance.post<Required<Booking>>(path, booking);
  return res.data;
};
export const cancel = async (id: number) => {
  const path = `bookings/${id}/cancel`;
  await instance.patch(path);
};
export const getRecent = async () => {
  const path = "bookings/recents";
  const res = await instance.get<RecentsBookingResponse>(path);
  return res.data;
};
export const createRating = async (rating: CreateRatingDTO) => {
  const path = "bookings/rating";
  await instance.post(path, rating);
};
export const getFindDriverMode = async () => {
  const path = "bookings/mode";
  const res = await instance.get<boolean>(path);
  return res.data;
};
