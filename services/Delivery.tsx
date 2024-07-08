import { getCookie } from "cookies-next";

export async function changeOrderStatus(
  idOrder: number,
  status: string,
  formData: FormData
): Promise<any> {
  const input = `${process.env.api}/delivery/deliveries/ChangeStatus?id=${idOrder}&deliveriesStatus=${status}`;
  const response = await fetch(input, {
    method: "PUT",
    body: formData,
    headers: {
      Authorization: `Bearer ${getCookie("accessToken")}`,
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message);
  }
}
