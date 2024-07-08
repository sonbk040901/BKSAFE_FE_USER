import * as storage from "../utils/storage";
import instance from "./axios";
import { Account, Cccd, Driver, License } from "./types";
export interface LoginDTO {
  phone: string;
  password: string;
}
export interface SignupDTO {
  password: string;
  email: string;
  fullName: string;
  phone: string;
}
export interface ActiveDTO {
  phone: string;
  activationCode: string;
}

export interface DriverRegisterDTO {
  cccd: Omit<Cccd, "id">;
  license: Omit<License, "id">;
  address?: string;
  birthday?: Date;
}
export const login = async (login: LoginDTO) => {
  const path = "auth/login";
  const res = await instance.post<string>(path, login);
  const token = res.data;
  storage.storeData("token", token);
  return token;
};
export const signup = async (signup: SignupDTO) => {
  const path = "auth/register";
  await instance.post(path, signup);
};
export const active = async (active: ActiveDTO) => {
  const path = "auth/active";
  await instance.patch(path, active);
};
export const logout = async () => {
  await storage.removeData("token");
  await storage.removeData("user");
};
export const getProfile = async () => {
  const path = "auth";
  const res = await instance.get<Account>(path);
  return res.data;
};
export const registerDriver = async (dto: DriverRegisterDTO) => {
  const path = "auth/register/driver";
  await instance.post(path, dto);
};
export const checkRegisterDriver = async () => {
  const path = "auth/register/driver/check";
  const res = await instance.get<Driver["registerStatus"] | null>(path);
  return res.data;
};
