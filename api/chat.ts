import instance from "./axios";
import { Chat, Driver } from "./types";

export interface ChatDetalResponse {
  driver: Driver;
  chats: Omit<Chat, "driver" | "user">[];
}

export const getChats = async () => {
  const res = await instance.get<Chat[]>("chats");
  return res.data;
};
export const getChatDetail = async (userId: number) => {
  const res = await instance.get<ChatDetalResponse>(`chats/${userId}`);
  return res.data;
};
