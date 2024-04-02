import { Socket } from "socket.io-client";
import { connect as createConnect } from "./socket";
let socket: Socket;
export const connect = async () => {
  if (socket) return;
  socket = await createConnect("booking");
  // eslint-disable-next-line no-console
  console.log(`Connected to booking socket ${socket.id}`);
};
export const listenCurrentBooking = (cb: (data: unknown) => void) => {
  socket.on("current", cb);
  return () => {
    socket.off("current", cb);
  };
};
