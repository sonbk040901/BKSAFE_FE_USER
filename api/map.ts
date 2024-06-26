import buildUrl from "../utils/searchParam";
import instance from "./axios";
import { updateApiKey } from "./ggmap";

interface FindDriversDTO {
  address?: string;
  latitude: number;
  longitude: number;
}
export interface CalculateCostDTO {
  distance: number;
  numberOfWaypoints: number;
}

interface FindDriversResponse extends FindDriversDTO {
  distance: number;
  id: number;
}

export const findDriver = async (findDriver: Type<FindDriversDTO>) => {
  const path = "map/drivers";
  const url = buildUrl(path, findDriver);
  const res = await instance.get<FindDriversResponse[]>(url);
  return res.data;
};
export const calculateCost = async (calculateCost: Type<CalculateCostDTO>) => {
  const path = "map/cost";
  const res = await instance.post<number>(path, calculateCost);
  return res.data;
};
export const getApiKey = async () => {
  const path = "map/api-key";
  const res = await instance.get<string>(path);
  updateApiKey(res.data);
  return res.data;
};
