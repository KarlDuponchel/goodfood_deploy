import { apiFetch } from "@/utils/fetch";
import { Deliveries } from "@/utils/types";
import { useQuery } from "react-query";

const fetchDeliveriesByOrderId = async (id: number) => {
  return await apiFetch<Deliveries[]>(`/delivery/deliveries/byorderid/${id}`);
};

export const useFetchDeliveriesByOrderID = (id: number) => {
  return useQuery({
    queryKey: ["deliveries-by-order-id", id],
    queryFn: () => fetchDeliveriesByOrderId(id),
    keepPreviousData: true,
  });
};
