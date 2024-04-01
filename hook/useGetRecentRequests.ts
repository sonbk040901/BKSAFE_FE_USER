import { useCallback, useState } from "react";
import { getRecentRequests } from "../api_v1";

export default () => {
  const [isPending, setIsPending] = useState(true);
  const [data, setData] =
    useState<Awaited<ReturnType<typeof getRecentRequests>>>();
  const fetchData = useCallback(() => {
    setIsPending(true);
    getRecentRequests()
      .then((res) => {
        setData(res);
      })
      .finally(() => {
        setIsPending(false);
      });
  }
  , []);
  return { data, fetchData, isPending };
};
