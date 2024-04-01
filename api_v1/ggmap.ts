import axios from "axios";

const BASE_URL = "https://maps.googleapis.com/maps/api";
export const API_KEY = "AIzaSyBdPsHYo7lp6JL3fsQwlcTQCKvbBlT50rE";
const instance = axios.create({
  baseURL: BASE_URL,
});
export const autoComplete = async (input: string) => {
  const res = await instance.get<AutoCompleteResultType>(
    `place/autocomplete/json?key=${API_KEY}&region=vn&language=vi&input=${input}`,
  );
  return res.data;
};
export type AutoCompleteResultType = {
  predictions: {
    description: string;
    structured_formatting: { main_text: string };
  }[];
  status: string;
};
export type GeoCodeResultType = {
  results: {
    formatted_address: string;
    geometry: { location: { lat: number; lng: number } };
  }[];
};
export const geoCode = async (address: string) => {
  const res = await instance.get<GeoCodeResultType>(
    `/geocode/json?key=${API_KEY}&&region=vn&language=vi&address=${address}`,
  );
  const data = res.data;
  return data.results?.[0].geometry.location;
};

export const geoReverse = async (lat: number, lng: number) => {
  const res = await instance.get<GeoCodeResultType>(
    `/geocode/json?key=${API_KEY}&&region=vn&language=vi&latlng=${lat},${lng}`,
  );
  const data = res.data;
  return data.results?.[0].formatted_address;
};
