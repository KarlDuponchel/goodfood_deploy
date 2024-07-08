"use client";

import { SidebarPartners } from "@/containers/partners/SidebarPartners";
import { StatOrderBestSold } from "@/containers/partners/statistics/StatOrderBestSold";
import { useFetchAllRestaurants } from "@/hooks/restaurants/use_fetch_all_restaurants";
import { useAuth } from "@/hooks/useAuth";
import { useState } from "react";
import { StatOrderBestBought } from "./StatOrderBestBought";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { StatCountOrders } from "@/containers/partners/statistics/StatCountOrders";
import { StatTotalAmount } from "@/containers/partners/statistics/StatTotalAmount";
import { LoadingPartner } from "@/containers/Loading/loading-partner";

export const StatisticsPage = () => {
  const { user, role } = useAuth();

  const [valueRestaurant, setValueRestaurant] = useState("");
  const allRestaurants = useFetchAllRestaurants();

  if (!user) return <LoadingPartner />;
  return (
    <div className="grid min-h-screen w-full grid-cols-6 grid-rows-10 bg-background">
      <SidebarPartners />
      <div className="col-span-5 col-start-2 row-span-8 flex flex-col">
        {role == 3 && (
          <div className="w-full h-20 flex justify-center items-center">
            <Select onValueChange={(e) => setValueRestaurant(e)}>
              <SelectTrigger className="w-3/4">
                <SelectValue placeholder="Sélectionner un restaurant" />
              </SelectTrigger>
              <SelectContent>
                {allRestaurants.data &&
                  allRestaurants.data.data.map((restaurant) => {
                    return (
                      <SelectItem
                        key={restaurant.ID}
                        value={String(restaurant.ID)}
                      >
                        {restaurant.name}
                      </SelectItem>
                    );
                  })}
              </SelectContent>
            </Select>
          </div>
        )}
        {user._restaurant ? (
          <div className="grid grid-cols-2 grid-rows-2 h-full max-lg:flex max-lg:flex-col">
            <StatCountOrders idRestaurant={user._restaurant} />
            <StatOrderBestSold idRestaurant={user._restaurant} />
            <StatTotalAmount idRestaurant={user._restaurant} />
            <StatOrderBestBought idRestaurant={user._restaurant} />
          </div>
        ) : (
          <div className="grid grid-cols-2 grid-rows-2 h-full max-lg:flex max-lg:flex-col max-lg:w-full">
            <StatCountOrders idRestaurant={Number(valueRestaurant)} />
            <StatOrderBestSold idRestaurant={Number(valueRestaurant)} />
            <StatTotalAmount idRestaurant={Number(valueRestaurant)} />
            <StatOrderBestBought idRestaurant={Number(valueRestaurant)} />
          </div>
        )}
      </div>
    </div>
  );
};
