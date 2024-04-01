import useFetch from "./useFetch";
import { bookingApi } from "../";

function useRecentsBooking() {
  return useFetch({
    fetchFn: bookingApi.getRecent,
  });
}

export default useRecentsBooking;
