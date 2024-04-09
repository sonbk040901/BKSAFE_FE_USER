import { bookingApi } from "..";
import { FindAllBookingDTO } from "../booking";
import useFetch from "./useFetch";

interface UseBookingsOptions extends FindAllBookingDTO {}

function useBookings(props: UseBookingsOptions) {
  const { data, ...rest } = useFetch(
    {
      fetchFn: () => bookingApi.getAll(props),
      initialData: [],
    },
    [props],
  );
  return { bookings: data, ...rest };
}

export default useBookings;
