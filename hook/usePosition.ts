import { useCallback, useState } from "react";
import { geoCode, geoReverse } from "../api/ggmap";
type LocationType = {
  latitude: number;
  longitude: number;
  address: string;
};
type InitialPositions = LocationType[];
const usePosition = (initValue: InitialPositions = []) => {
  const [positions, setPositions] = useState(initValue);
  const addAddress = useCallback(async (address: string) => {
    const location = await geoCode(address);
    if (location) {
      setPositions((prev) => [
        ...prev,
        {
          latitude: location.lat,
          longitude: location.lng,
          address,
        },
      ]);
    }
  }, []);
  const addLocation = useCallback(
    async (location: Omit<LocationType, "address">) => {
      const { latitude, longitude } = location;
      const address = await geoReverse(latitude, longitude);
      if (address) {
        setPositions((prev) => [...prev, { longitude, latitude, address }]);
      }
    },
    [],
  );
  const remove = useCallback((value: number) => {
    // const index =
    //   typeof value === "number"
    //     ? value
    //     : typeof value === "string"
    //     ? positions.findIndex((item) => item.address === value)
    //     : positions.findIndex((item) => item.location === value);
    // if (index === -1) return;
    const index = value;
    setPositions((prev) => prev.filter((_, i) => i !== index));
  }, []);
  const replace = useCallback(async (index: number, address: string) => {
    const location = await geoCode(address);
    setPositions((prev) => {
      prev[index] = {
        latitude: location.lat,
        longitude: location.lng,
        address,
      };
      return [...prev];
    });
  }, []);
  return { positions, addAddress, addLocation, remove, replace };
};
export default usePosition;
