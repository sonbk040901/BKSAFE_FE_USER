import { useEffect } from "react";
import { findCarDrivers } from "../api";
import { useMutation } from "@tanstack/react-query";
import { showNativeAlert } from "../utils/alert";

type LocationType = {
  latitude: number;
  longitude: number;
};
type Props = {
  location: LocationType;
  address: string;
};
export default (currentLocation?: Props, isEnable: boolean = true) => {
  const { data = [], mutate } = useMutation({
    mutationFn: async () => {
      if (!currentLocation) return [];
      return findCarDrivers({
        lat: currentLocation.location.latitude,
        lng: currentLocation.location.longitude,
      }).then((res) => {
        showNativeAlert(`Tìm thấy ${res.length} tài xế gần bạn`);
        return res;
      });
    },
  });
  useEffect(() => {
    if (isEnable) mutate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentLocation?.address]);
  return data;
};
