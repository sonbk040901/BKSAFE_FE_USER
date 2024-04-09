/* eslint-disable no-console */
import { Socket } from "socket.io-client";
import { connect as createConnect } from "./socket";
let socket: Socket;
let isConnecting = false;
export const connect = async () => {
  if (isConnecting) return;
  isConnecting = true;
  socket = await createConnect("booking");
  isConnecting = false;
  console.log(`Connected to booking socket`);
};
export const disconnect = () => {
  if (!socket) return;
  socket.disconnect();
  console.log(`Disconnected from booking socket`);
};
export const listenCurrentBooking = (cb: (data: unknown) => void) => {
  socket.on("current", cb);
  console.log("Listening to current booking");
  return () => {
    socket.off("current", cb);
    console.log("Stopped listening to current booking");
  };
};
