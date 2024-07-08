import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { StatChartOrders } from "@/containers/partners/statistics/StatChartOrders";
import { StatChartTotalAmount } from "@/containers/partners/statistics/StatChartTotalAmount";
import { useEffect, useState } from "react";

type StatTotalAmountProps = {
  idRestaurant: number;
};

export const StatTotalAmount = ({ idRestaurant }: StatTotalAmountProps) => {
  const [period, setPeriod] = useState<string>("");

  return (
    <div className="col-start-1 row-start-2 py-4 px-2 flex flex-col gap-2 max-lg:px-16">
      <div className="w-full flex justify-between items-center">
        <span className="text-lg">Chiffre d'affaires</span>
        <Select onValueChange={(e) => setPeriod(e)} defaultValue="week">
          <SelectTrigger className="w-fit">
            <SelectValue placeholder="Période" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="week">Semaine</SelectItem>
            <SelectItem value="month">Mois</SelectItem>
            <SelectItem value="year">Année</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        {period !== "" && idRestaurant !== 0 ? (
          <StatChartTotalAmount period={period} idRestaurant={idRestaurant} />
        ) : (
          <span className="flex w-full justify-center p-4 bg-white rounded">
            Seléctionner une période
          </span>
        )}
      </div>
    </div>
  );
};
