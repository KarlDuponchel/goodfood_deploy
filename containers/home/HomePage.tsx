"use client";

import { useState } from "react";
import { Footer } from "../Footer";
import { Header } from "../Header";
import { ProductsCards } from "../products/ProductsCards";
import { HomeBasket } from "@/containers/home/HomeBasket";
import { useAuth } from "@/hooks/useAuth";
import { HomeBasketUser } from "@/containers/home/HomeBasketUser";
import { useFetchAllRestaurants } from "@/hooks/restaurants/use_fetch_all_restaurants";
import { ProductsCardsByRestaurant } from "@/containers/products/ProductsCardsByRestaurant";
import { X, XSquare } from "lucide-react";

export const HomePage = ({}) => {
  const { user } = useAuth();
  const [updateShoppingCart, setUpdateShoppingCart] = useState<boolean>(false);

  const restaurants = useFetchAllRestaurants();

  const [idRestaurant, setIdRestaurant] = useState(0);

  const toogleFromChild = (n: any) => {
    if (!updateShoppingCart) {
      setUpdateShoppingCart(n);
    } else {
      setUpdateShoppingCart(!n);
    }
  };

  return (
    <>
      <Header toogle={updateShoppingCart} />
      <div className="p-6 flex flex-col gap-8 min-h-screen">
        <div className="flex gap-8 items-center w-full">
          <span className="font-bold text-lg text-black whitespace-nowrap">
            Une sélection de produit, rien que{" "}
            <span className="text-primary">pour vous</span>
          </span>
          <div className="flex gap-3 overflow-x-scroll no-scrollbar">
            {restaurants.data?.data.map((restaurant) => {
              return (
                <div className="flex items-center">
                  <span
                    className={`whitespace-nowrap hover:bg-zinc-300 transition ${
                      idRestaurant == restaurant.ID
                        ? "bg-zinc-300 rounded-r-0 border-r-0"
                        : "bg-zinc-200 rounded cursor-pointer"
                    } border border-slate-300 p-2`}
                    onClick={() =>
                      restaurant.ID && setIdRestaurant(restaurant.ID)
                    }
                  >
                    {restaurant.name}
                  </span>
                  {idRestaurant == restaurant.ID && (
                    <span
                      className="p-2 bg-zinc-300 border border-l-0 border-slate-300 rounded-r cursor-pointer hover:opacity-80 transition"
                      onClick={() => setIdRestaurant(0)}
                    >
                      <X className="w-6 h-6 p-1 text-zinc-600" />
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
        <div className="flex">
          <div className="w-3/4 max-2xl:w-full h-full flex flex-col gap-4">
            {idRestaurant === 0 ? (
              <ProductsCards
                page={1}
                limit={10}
                showMore
                onUpdateCart={toogleFromChild}
              />
            ) : (
              <ProductsCardsByRestaurant
                idRestaurant={idRestaurant}
                onUpdateCart={toogleFromChild}
              />
            )}
          </div>
          <div className="w-1/4 max-2xl:hidden border-l border-slate-200 flex flex-col gap-4">
            {user ? (
              <HomeBasketUser user={user} onUpdateCart={updateShoppingCart} />
            ) : (
              <HomeBasket onUpdateCart={updateShoppingCart} />
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};
