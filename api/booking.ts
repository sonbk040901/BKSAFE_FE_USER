import buildUrl from "../utils/searchParam";
import instance from "./axios";
import { Booking, BookingStatus, PagingAndSortDto } from "./types";
interface LocationDTO {
  address: string;
  latitude: number;
  longitude: number;
}
interface BookingDTO {
  pickup: LocationDTO;
  dropOff: LocationDTO;
  stops: LocationDTO[];
  note?: string;
  notes?: number[];
}
interface FindAllBookingDTO extends PagingAndSortDto {
  status?: BookingStatus;
}

interface RecentsBookingResponse {
  current: Nullable<Booking>;
  recent: Nullable<Booking>;
}

export const getAll = async (findAll: Type<FindAllBookingDTO>) => {
  const path = "bookings";
  const url = buildUrl(path, findAll);
  const res = await instance.get<Booking[]>(url);
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
