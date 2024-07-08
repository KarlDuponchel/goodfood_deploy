import { apiFetch } from "@/utils/fetch";
import { useQuery } from "react-query";

const fetchTotalAmountByPeriod = async (
  period: string,
  idRestaurant: number
) => {
  return await apiFetch<any[]>(
    `/reporting/ReportingOrder/gettotalamount/${period}?&idRestaurant=${idRestaurant}`
  );
};

export const useFetchTotalAmountByPeriod = (
  period: string,
  idRestaurant: number
) => {
  return useQuery({
    queryKey: ["total-amount-by-period", idRestaurant, period],
    queryFn: () => fetchTotalAmountByPeriod(period, idRestaurant),
  });
};
