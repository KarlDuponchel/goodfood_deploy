import { apiFetch } from "@/utils/fetch";
import { Restaurant } from "@/utils/types";
import { useQuery } from "react-query";

const fetchCountOrdersByRestaurantId = async (
  dateMin: string,
  dateMax: string,
  idRestaurant: number
) => {
  return await apiFetch<any[]>(
    `/reporting/ReportingOrder/countorders?dateMin=${dateMin}&dateMax=${dateMax}&idRestaurant=${idRestaurant}`
  );
};

export const useFetchCountOrdersByRestaurantId = (
  dateMin: string,
  dateMax: string,
  idRestaurant: number
) => {
  return useQuery({
    queryKey: ["count-orders", idRestaurant],
    queryFn: () =>
      fetchCountOrdersByRestaurantId(dateMin, dateMax, idRestaurant),
  });
};
