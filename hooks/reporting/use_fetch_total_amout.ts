import { apiFetch } from "@/utils/fetch";
import { Restaurant } from "@/utils/types";
import { useQuery } from "react-query";

const fetchTotalAmount = async (dateMin: string, dateMax: string) => {
  return await apiFetch<any[]>(
    `/reporting/ReportingOrder/countorders?dateMin=${dateMin}&dateMax=${dateMax}`
  );
};

export const useFetchTotalAmount = (dateMin: string, dateMax: string) => {
  return useQuery({
    queryKey: ["total-amount", dateMin, dateMax],
    queryFn: () => fetchTotalAmount(dateMin, dateMax),
  });
};
