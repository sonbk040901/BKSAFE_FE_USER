import { useEffect, useState } from "react";
import { bookingApi } from "../";
import { connect } from "../../socket/booking";
import useFetch from "./useFetch";

function useRecentsBooking() {
  const { status: fetchStatus, ...states } = useFetch({
    fetchFn: bookingApi.getRecent,
  });
  const [socketConnected, setSocketConnected] = useState(false);
  useEffect(() => {
    connect().then(() => {
      setSocketConnected(true);
    });
  }, [states, states.refetch]);
  const status = socketConnected ? fetchStatus : "loading";
  return { status, ...states };
}

export default useRecentsBooking;
