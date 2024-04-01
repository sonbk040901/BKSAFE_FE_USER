import { useMutation } from "@tanstack/react-query";
import { bookingApi } from "../";

function useCreateBooking() {
  const { status, mutate } = useMutation({
    mutationFn: bookingApi.create,
  });
  return { status, createBooking: mutate };
}

export default useCreateBooking;
