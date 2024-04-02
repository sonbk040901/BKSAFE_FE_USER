import { useMutation } from "@tanstack/react-query";
import { bookingApi } from "..";

function useCancelBooking() {
  const { mutate, status } = useMutation({
    mutationFn: bookingApi.cancel,
  });
  return { cancelBooking: mutate, cancelStatus: status };
}

export default useCancelBooking;
