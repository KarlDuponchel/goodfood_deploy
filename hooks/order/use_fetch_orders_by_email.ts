import { apiFetch } from "@/utils/fetch";
import { useQuery } from "react-query";

const fetchOrdersByEmail = async (email: string) => {
  return await apiFetch<
    {
      id: number;
      email: string;
      idRestaurant: number;
      country: string;
      city: string;
      address: string;
      additionnalAddress: string;
      zipCode: string;
      commandType: string;
      isValidate: boolean;
      createdAt: string;
      updatedAt: string;
      orderContents: {
        id: number;
        idOrder: number;
        idContent: number;
        contentName: string;
        quantity: number;
        price: number;
      }[];
    }[]
  >(`/order/orders?email=${email}`);
};

export const useFetchOrdersByEmail = (email: string) => {
  return useQuery({
    queryKey: ["orders-by-email", email],
    queryFn: () => fetchOrdersByEmail(email),
  });
};
