import { useMutation } from "@tanstack/react-query";
import { mapApi } from "..";

function useCalculateCost() {
  const {
    data: money,
    mutate: calculate,
    ...rest
  } = useMutation({
    mutationFn: mapApi.calculateCost,
  });
  return { money, calculate, ...rest };
}

export default useCalculateCost;
