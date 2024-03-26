import { useCallback, useState } from "react";
import { geoCode, geoReverse } from "../api/ggmap";

type LocationType = {
  latitude: number;
  longitude: number;
};
type InitialPositions = {
  location: LocationType;
  address: string;
}[];
const usePosition = (initValue: InitialPositions = []) => {
  const [positions, setPositions] = useState(initValue);
  const addAddress = useCallback(async (address: string) => {
    const location = await geoCode(address);
    if (location) {
      setPositions((prev) => [
        ...prev,
        {
          location: { latitude: location.lat, longitude: location.lng },
          address,
        },
      ]);
    }
  }, []);
  const addLocation = useCallback(async (location: LocationType) => {
    const address = await geoReverse(location.latitude, location.longitude);
    if (address) {
      setPositions((prev) => [...prev, { location, address }]);
    }
  }, []);
  const remove = useCallback(
    (value: number | string | LocationType) => {
      const index =
        typeof value === "number"
          ? value
          : typeof value === "string"
          ? positions.findIndex((item) => item.address === value)
          : positions.findIndex((item) => item.location === value);
      if (index === -1) return;
      setPositions((prev) => prev.filter((_, i) => i !== index));
    },
    [positions],
  );
  const replace = useCallback(async (index: number, address: string) => {
    const location = await geoCode(address);
    setPositions((prev) => {
      prev[index] = {
        location: { latitude: location.lat, longitude: location.lng },
        address,
      };
      return [...prev];
    });
  }, []);
  return { positions, addAddress, addLocation, remove, replace };
};
export default usePosition;
