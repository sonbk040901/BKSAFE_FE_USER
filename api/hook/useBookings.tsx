import { Booking, PagingAndSortResponse, bookingApi } from "../";
import { FindAllBookingDTO } from "../booking";
import useFetch from "./useFetch";
const initialData: PagingAndSortResponse<Booking> = {
  data: [],
  skip: 0,
  take: 10,
  total: 0,
  order: "desc",
  sort: "id",
};

interface UseBookingsOptions extends FindAllBookingDTO {}

function useBookings(props: UseBookingsOptions) {
  return useFetch(
    {
      fetchFn: () => bookingApi.getAll(props),
      initialData,
    },
    [props],
  );
}

export default useBookings;
