import { useCallback, useEffect, useState } from "react";
import { getAllRequests } from "../api";

export default () => {
  const [isPending, setIsPending] = useState(true);
  const [data, setData] =
    useState<Awaited<ReturnType<typeof getAllRequests>>>([]);
  const fetchData = useCallback(() => {
    setIsPending(true);
    getAllRequests()
      .then((res) => {
        setData(res);
      })
      .finally(() => {
        setIsPending(false);
      });
  }, []);
  useEffect(() => {
    fetchData();
  }, [fetchData]);
  return { data, fetchData, isPending };
};
