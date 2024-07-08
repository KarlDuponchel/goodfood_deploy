import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { StatTableBestSold } from "@/containers/partners/statistics/StatTableBestSold";
import { dateAvant } from "@/utils/function";
import { User } from "@/utils/types";
import { useEffect, useState } from "react";
import { StatTableBestBought } from "./StatTableBestBought";

type StatOrderBestBoughtProps = {
  idRestaurant: number;
};

export const StatOrderBestBought = ({
  idRestaurant,
}: StatOrderBestBoughtProps) => {
  const [dateMin, setDateMin] = useState<string>("");

  return (
    <div className="col-start-2 row-start-2 py-4 px-16 flex flex-col gap-2">
      <div className="w-full flex justify-between items-center">
        <span className="text-lg">Top 5 plats vendus</span>
        <Select
          onValueChange={(e) =>
            setDateMin(new Date(dateAvant(e)).toISOString())
          }
          defaultValue="semaine"
        >
          <SelectTrigger className="w-fit">
            <SelectValue placeholder="Période" defaultValue="Jour" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="jour">Jour</SelectItem>
            <SelectItem value="semaine">Semaine</SelectItem>
            <SelectItem value="mois">Mois</SelectItem>
            <SelectItem value="an">Année</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        {dateMin !== "" && idRestaurant !== 0 ? (
          <StatTableBestBought dateMin={dateMin} idRestaurant={idRestaurant} />
        ) : (
          <span className="flex w-full justify-center p-4 bg-white rounded">
            Sélectionner une période
          </span>
        )}
      </div>
    </div>
  );
};
