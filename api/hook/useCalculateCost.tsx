import { useMutation } from "@tanstack/react-query";
import { mapApi } from "..";

function useCalculateCost(initialValue?: number) {
  const {
    data: money = initialValue,
    mutate: calculate,
    ...rest
  } = useMutation({
    mutationFn: mapApi.calculateCost,
  });
  return { money, calculate, ...rest };
}

export default useCalculateCost;
