import { AxiosRequestConfig } from "axios";
import { useEffect, useState } from "react";
import { axiosInstance } from "../api_v1";

type MethodType = "get" | "post" | "put" | "delete" | "patch";
type StatusType = "loading" | "error" | "success";
export default function useFetch<T = unknown>(
  url: string,
  method: MethodType,
  data?: AxiosRequestConfig,
) {
  const [status, setStatus] = useState<StatusType>("loading");
  const [response, setResponse] = useState<T>();
  useEffect(() => {
    const fetchData = async () => {
      try {
        setStatus("loading");
        const response = await axiosInstance[method](url, data);
        setStatus("success");
        setResponse(response.data);
      } catch (error: unknown) {
        setStatus("error");
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        setResponse((error as any).response?.data);
        return error;
      }
    };
    fetchData();
  }, [data, method, url]);
  return { status, response };
}