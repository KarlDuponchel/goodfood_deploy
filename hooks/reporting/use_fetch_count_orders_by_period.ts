import { apiFetch } from "@/utils/fetch";
import { Restaurant, StatCountOrders } from "@/utils/types";
import { useQuery } from "react-query";

const fetchCountOrdersByPeriod = async (
  period: string,
  idRestaurant: number
) => {
  return await apiFetch<StatCountOrders[]>(
    `/reporting/ReportingOrder/countorders/${period}?&idRestaurant=${idRestaurant}`
  );
};

export const useFetchCountOrdersByPeriod = (
  period: string,
  idRestaurant: number
) => {
  return useQuery({
    queryKey: ["count-orders-by-period", idRestaurant, period],
    queryFn: () => fetchCountOrdersByPeriod(period, idRestaurant),
  });
};
