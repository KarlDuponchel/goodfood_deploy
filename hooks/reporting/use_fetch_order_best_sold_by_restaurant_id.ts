import { apiFetch } from "@/utils/fetch";
import { StatBestBought } from "@/utils/types";
import { useQuery } from "react-query";

const fetchOrderBestSoldByRestaurantId = async (
  dateMin: string,
  dateMax: string,
  idRestaurant: number
) => {
  return await apiFetch<StatBestBought[]>(
    `/reporting/ReportingOrder/getorderbestsold?dateMin=${dateMin}&dateMax=${dateMax}&idRestaurant=${idRestaurant}&NumlberOfBest=5`
  );
};

export const useFetchOrderBestSoldByRestaurantId = (
  dateMin: string,
  dateMax: string,
  idRestaurant: number
) => {
  return useQuery({
    queryKey: ["order-best-sold-by-restaurant-id", idRestaurant, dateMin],
    queryFn: () =>
      fetchOrderBestSoldByRestaurantId(dateMin, dateMax, idRestaurant),
  });
};
