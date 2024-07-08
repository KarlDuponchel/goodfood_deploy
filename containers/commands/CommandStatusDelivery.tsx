import { Loading } from "@/containers/Loading/loading";
import { useFetchDeliveriesByOrderID } from "@/hooks/delivery/use_fetch_delivery_by_order_id";
import { BadgeCheck, Truck } from "lucide-react";
import { useEffect, useState } from "react";

type CommandStatusDeliveryProps = {
  idOrder: number;
};

export const CommandStatusDelivery = ({
  idOrder,
}: CommandStatusDeliveryProps) => {
  const [styleStatus, setStyleStatus] = useState<string>("");
  const delivery = useFetchDeliveriesByOrderID(idOrder);

  useEffect(() => {
    if (!delivery.data) return;
    switch (delivery.data[0].status.myStatus) {
      case "En cours":
        setStyleStatus("bg-orange-300 hover:bg-orange-400");
        break;
      case "Livré":
        setStyleStatus("bg-green-300 hover:bg-green-400");
        break;
      default:
        setStyleStatus("bg-red-500 hover:bg-red-400");
        break;
    }
  }, [delivery.data]);

  if (!delivery.data) return <Loading />;
  return (
    <a
      className={`flex p-2 ${styleStatus} rounded-md text-black cursor-pointer`}
      href={`/commands/${idOrder}`}
    >
      {delivery.data[0].status.myStatus == "Livré" ? (
        <BadgeCheck className="w-6 h-6" />
      ) : (
        <Truck className="w-6 h-6" />
      )}
    </a>
  );
};
