import { apiFetch } from "@/utils/fetch";
import { Restaurant } from "@/utils/types";
import { useQuery } from "react-query";

const fetchOrderBestSold = async (dateMin: string, dateMax: string) => {
  return await apiFetch<any[]>(
    `/reporting/ReportingOrder/getorderbestsold?dateMin=${dateMin}&dateMax=${dateMax}`
  );
};

export const useFetchOrderBestSold = (dateMin: string, dateMax: string) => {
  return useQuery({
    queryKey: ["order-best-sold"],
    queryFn: () => fetchOrderBestSold(dateMin, dateMax),
  });
};
