import { apiFetch } from "@/utils/fetch";
import { Restaurant } from "@/utils/types";
import { useQuery } from "react-query";

const fetchTotalAmountRestaurantId = async (
  dateMin: string,
  dateMax: string,
  idRestaurant: number
) => {
  return await apiFetch<any[]>(
    `/reporting/ReportingOrder/countorders?dateMin=${dateMin}&dateMax=${dateMax}&idRestaurant=${idRestaurant}`
  );
};

export const useFetchTotalAmountByRestaurantId = (
  dateMin: string,
  dateMax: string,
  idRestaurant: number
) => {
  return useQuery({
    queryKey: ["total-amount-by-restaurant-id", dateMin, dateMax, idRestaurant],
    queryFn: () => fetchTotalAmountRestaurantId(dateMin, dateMax, idRestaurant),
  });
};
