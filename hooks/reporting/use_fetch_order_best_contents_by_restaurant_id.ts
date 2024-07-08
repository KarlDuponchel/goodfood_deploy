import { apiFetch } from "@/utils/fetch";
import { StatBestContents } from "@/utils/types";
import { useQuery } from "react-query";

const fetchOrderBestContentsByRestaurantId = async (
  dateMin: string,
  dateMax: string,
  idRestaurant: number
) => {
  return await apiFetch<StatBestContents[]>(
    `/reporting/ReportingOrder/getorderbestcontents?dateMin=${dateMin}&dateMax=${dateMax}&idRestaurant=${idRestaurant}&Numlberofbest=5`
  );
};

export const useFetchOrderBestContentsByRestaurantId = (
  dateMin: string,
  dateMax: string,
  idRestaurant: number
) => {
  return useQuery({
    queryKey: ["order-best-contents-by-restaurant-id", idRestaurant, dateMin],
    queryFn: () =>
      fetchOrderBestContentsByRestaurantId(dateMin, dateMax, idRestaurant),
  });
};
