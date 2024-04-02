import { useMutation } from "@tanstack/react-query";
import { Booking, bookingApi } from "../";

function useCreateBooking(initialData?: Booking) {
  const {
    status,
    mutate,
    data = initialData,
  } = useMutation({
    mutationFn: bookingApi.create,
  });
  return { createBookingStatus: status, createBooking: mutate, booking: data };
}

export default useCreateBooking;
