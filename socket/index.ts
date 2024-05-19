/* eslint-disable no-console */
import { io, Socket } from "socket.io-client";
import { getData } from "../utils/storage";
export const ENDPOINT = `${process.env.EXPO_PUBLIC_BACKEND_URL}:${process.env.EXPO_PUBLIC_BACKEND_PORT}`;
export const connect = async (path: string = "") => {
  const token = await getData("token");
  const socket = io(`${ENDPOINT}/${path}`, {
    extraHeaders: {
      authorization: token,
    },
  });
  return socket;
};

export type SocketNameSpace = "booking";
export type BookingEvent =
  | "current"
  | "current-status"
  | "current-driver"
  | "current-driver-location";
export type SocketEvent = `${SocketNameSpace}/${BookingEvent}`;
let booking: Socket | undefined;

export const createConnect = async () => {
  booking = await connect("booking");
  console.log("Connected to all namespaces");
};
export const disconnect = () => {
  if (!booking) return;
  booking.disconnect();
  console.log("Disconnected to all namespaces");
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const subcribe = (event: SocketEvent, cb: (...data: any[]) => void) => {
  if (!booking) return () => 0;
  const [namespace, eventName] = event.split("/") as [
    SocketNameSpace,
    BookingEvent,
  ];
  console.log("Subcribe: ", event);
  let unsubcribe: () => void;
  switch (namespace) {
    case "booking":
      booking.on(eventName, cb);
      unsubcribe = () => booking?.off(eventName, cb);
      break;
    default:
      unsubcribe = () => 0;
      break;
  }
  return () => {
    unsubcribe();
    console.log("Unsubcribe: ", event);
  };
};
