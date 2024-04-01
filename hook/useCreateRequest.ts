import { useMutation } from "@tanstack/react-query";
import { createRequestV2 } from "../api_v1";

export default () => {
  const { status, mutate } = useMutation({
    mutationFn: async (payload: Parameters<typeof createRequestV2>[0]) => {
      return createRequestV2(payload);
    },
  });
  return { status, createRequest: mutate };
};
