import { bookingApi } from "..";
import useFetch from "./useFetch";

function useFindDriverMode() {
  return useFetch({
    fetchFn: bookingApi.getFindDriverMode,
  });
}

export default useFindDriverMode;
