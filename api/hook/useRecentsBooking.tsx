import { bookingApi } from "../";
import useFetch from "./useFetch";

function useRecentsBooking() {
  const { status, ...states } = useFetch({
    fetchFn: bookingApi.getRecent,
  });
  return { status, ...states };
}

export default useRecentsBooking;
