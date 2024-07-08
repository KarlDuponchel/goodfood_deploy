"use client";

import { CommandsProductsName } from "@/containers/commands/CommandsProductName";
import { Footer } from "@/containers/Footer";
import { Header } from "@/containers/Header";
import { Loading } from "@/containers/Loading/loading";
import { useFetchOrdersByEmail } from "@/hooks/order/use_fetch_orders_by_email";
import { useFetchRestaurantById } from "@/hooks/restaurants/use_fetch_restaurant_by_id";
import { useAuth } from "@/hooks/useAuth";
import { convertDateToFr } from "@/utils/function";
import { CommandStatusDelivery } from "@/containers/commands/CommandStatusDelivery";

export const CommandsPage = () => {
  const { user } = useAuth();

  const commands = useFetchOrdersByEmail(user?.email ?? "");

  const restaurant = useFetchRestaurantById(
    commands && commands.data && commands.data.length > 0
      ? commands.data[0].idRestaurant
      : -1
  );

  const getFullPrice = (products: any[]) => {
    let total = 0;
    for (let i = 0; i < products.length; i++) {
      if (products[i].quantity > 1) {
        total += products[i].price * products[i].quantity;
      } else {
        total += products[i].price;
      }
    }
    return total.toFixed(2);
  };

  if (!commands.data) return <Loading />;

  return (
    <>
      <Header />
      <div className="flex min-h-screen flex-col gap-8 p-6">
        <div className="flex justify-between text-lg font-bold">
          <span>
            Vos <span className="text-primary">commandes</span>
          </span>
        </div>
        {commands.data.length === 0 ? (
          <div className="flex w-full animate-pulse flex-col items-center justify-center text-4xl">
            Aucune commandes passées
          </div>
        ) : (
          <div className="flex w-full items-center justify-center">
            <div className="flex h-3/4 w-4/6 flex-col max-xl:w-5/6 max-sm:w-11/12">
              {commands.data
                .sort(
                  (a, b) =>
                    new Date(b.createdAt).getTime() -
                    new Date(a.createdAt).getTime()
                )
                .map((command) => {
                  return (
                    <div
                      key={command.id}
                      className="flex flex-col border-b py-3"
                    >
                      <div className="flex">
                        <div className="w-1/3 border-r px-3 max-xl:w-1/4">
                          <div className="flex items-center justify-start gap-2 max-xl:justify-center">
                            <div className="flex flex-col max-xl:hidden">
                              <span className="text-lg font-bold">
                                {restaurant.data?.name}
                                {" - "}
                                {convertDateToFr(command.createdAt)}
                              </span>
                              <span className="text-sm">
                                {restaurant.data?.address},{" "}
                                {restaurant.data?.zip_code}{" "}
                                {restaurant.data?.city}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex w-1/3 items-center justify-start border-r px-3 max-xl:w-2/4">
                          <ul className="list-disc pl-8 font-bold">
                            {command.orderContents.map((product) => {
                              return (
                                <CommandsProductsName
                                  key={product.id}
                                  id={product.idContent}
                                  quantity={product.quantity}
                                />
                              );
                            })}
                          </ul>
                        </div>
                        <div className="flex w-1/3 items-center justify-between px-12 max-xl:w-1/4 max-xl:px-4">
                          <span className="font-bold">
                            {getFullPrice(command.orderContents)}€
                          </span>
                          <span>
                            <CommandStatusDelivery idOrder={command.id} />
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};
