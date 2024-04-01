import { mapApi } from "..";
import { showNativeAlert } from "../../utils/alert";
import useFetch from "./useFetch";

interface UseFindDriverOptions {
  location?: {
    latitude: number;
    longitude: number;
  };
  autoFetch?: boolean;
}

function useFindDriver({ location, autoFetch }: UseFindDriverOptions) {
  const { data: drivers, ...res } = useFetch(
    {
      fetchFn: async () => {
        if (!location) return [];
        const drivers = await mapApi.findDriver(location);
        showNativeAlert(`Tìm thấy ${drivers.length} tài xế gần bạn`);
        return drivers;
      },
      autoFetch,
      initialData: [],
    },
    [location],
  );
  return { drivers, ...res };
}

export default useFindDriver;
