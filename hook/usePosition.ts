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
    if (location) setPositions((prev) => [...prev, location]);
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
  const remove = useCallback((index: number) => {
    setPositions((prev) => prev.filter((_, i) => i !== index));
  }, []);
  const replace = useCallback(async (index: number, address: string) => {
    const location = await geoCode(address);
    setPositions((prev) => {
      const positions = [...prev];
      positions[index] = location;
      return positions;
    });
  }, []);
  return { positions, addAddress, addLocation, remove, replace };
};
export default usePosition;
