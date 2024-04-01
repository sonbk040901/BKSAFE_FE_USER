import { useMutation } from "@tanstack/react-query";
import { LocationType } from "../types/location";
import { getCost } from "../api_v1";
const useCalculateMoney = () => {
  const {
    data: money,
    status,
    mutate: calculate,
  } = useMutation({
    mutationFn: ({
      distance,
      locations,
    }: {
      distance: number;
      locations: LocationType[];
    }) => getCost(distance, locations),
  });
  return [money, status, calculate] as const;
};

export default useCalculateMoney;
