import { useCallback, useEffect, useState } from "react";
import { ErrorResponse } from "../types";
import { useNavigation } from "@react-navigation/native";
import { RootNavigationProp } from "../../types/navigation";
import { AxiosError } from "axios";
import { showAlert } from "../../utils/alert";

type FetchStatus = "loading" | "success" | "error";
type UseFetchOptions<D, RD> = {
  fetchFn: () => Promise<D>;
  initialData?: RD;
  autoFetch?: boolean;
};
type UseFetchReturn<D, RD> = {
  data: RD extends undefined ? D | null : D;
  status: FetchStatus;
  error: ErrorResponse | null;
  refetch: () => void;
};
function useFetch<D, RD extends D | undefined>(
  opts: UseFetchOptions<D, RD>,
  deps: readonly unknown[] = [],
) {
  const { fetchFn, initialData, autoFetch = true } = opts;
  const navigation = useNavigation<RootNavigationProp>();
  const [data, setData] = useState<D | null>(initialData || null);
  const [error, setError] = useState<ErrorResponse | null>(null);
  const status = data ? "success" : error ? "error" : "loading";
  const refetch = useCallback(() => {
    setData(initialData || null);
    fetchFn()
      .then(setData)
      .catch((error) => {
        const err = error as AxiosError<ErrorResponse, ErrorResponse>;
        const res = err.response!.data;
        if (res.statusCode === 401 && res.error) {
          showAlert("Phiên đăng nhập hết hạn", "Vui lòng đăng nhập lại");
          navigation.navigate("Auth");
        } else {
          setError(res);
        }
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigation, ...deps]);
  useEffect(() => {
    if (autoFetch) refetch();
  }, [autoFetch, refetch]);
  return { data, status, error, refetch } as UseFetchReturn<D, RD>;
}

export default useFetch;
// React Hook useEffect đã được chuyển qua một danh sách phụ thuộc không phải là một mảng bằng chữ. Điều này có nghĩa là chúng tôi không thể xác minh tĩnh xem bạn có chuyển đúng phần phụ thuộc hay không
