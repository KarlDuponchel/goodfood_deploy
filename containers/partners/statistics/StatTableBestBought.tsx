import { ContentName } from "@/components/admin/ContentName";
import { useFetchOrderBestSoldByRestaurantId } from "@/hooks/reporting/use_fetch_order_best_sold_by_restaurant_id";

type StatTableBestBoughtProps = {
  dateMin: string;
  idRestaurant: number;
};

export const StatTableBestBought = ({
  dateMin,
  idRestaurant,
}: StatTableBestBoughtProps) => {
  const bestSold = useFetchOrderBestSoldByRestaurantId(
    dateMin,
    new Date().toISOString(),
    idRestaurant
  );

  return (
    <div className="w-full p-4 bg-white rounded-md flex flex-col gap-4">
      {idRestaurant ? (
        dateMin ? (
          bestSold.data?.map((product, key) => {
            return (
              <div
                key={product.idContent}
                className="w-full flex justify-between"
              >
                <div className="flex gap-4 items-center">
                  <span>{key + 1}</span>
                  <ContentName idContent={product.idContent} />
                </div>
                <div>
                  <span>{product.totalPrice}€</span>
                </div>
              </div>
            );
          })
        ) : (
          <div>Sélectionner une période</div>
        )
      ) : (
        <div>Sélectionner un restaurant</div>
      )}
    </div>
  );
};
