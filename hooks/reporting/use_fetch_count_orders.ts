import { apiFetch } from "@/utils/fetch";
import { Restaurant } from "@/utils/types";
import { useQuery } from "react-query";

const fetchCountOrders = async (dateMin: string, dateMax: string) => {
  return await apiFetch<any[]>(
    `/reporting/ReportingOrder/countorders?dateMin=${dateMin}&dateMax=${dateMax}`
  );
};

export const useFetchCountOrders = (dateMin: string, dateMax: string) => {
  return useQuery({
    queryKey: ["count-orders"],
    queryFn: () => fetchCountOrders(dateMin, dateMax),
  });
};
