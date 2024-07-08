import { apiFetch } from "@/utils/fetch";
import { useQuery } from "react-query";

const fetchOrderBestContents = async (dateMin: string, dateMax: string) => {
  return await apiFetch<any[]>(
    `/reporting/ReportingOrder/getorderbestcontents?dateMin=${dateMin}&dateMax=${dateMax}`
  );
};

export const useFetchOrderBestContents = (dateMin: string, dateMax: string) => {
  return useQuery({
    queryKey: ["order-best-contents", dateMin, dateMax],
    queryFn: () => fetchOrderBestContents(dateMin, dateMax),
  });
};
