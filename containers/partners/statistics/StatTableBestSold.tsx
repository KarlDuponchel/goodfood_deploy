import { ContentName } from "@/components/admin/ContentName";
import { useFetchOrderBestContentsByRestaurantId } from "@/hooks/reporting/use_fetch_order_best_contents_by_restaurant_id";
import { useFetchOrderBestSoldByRestaurantId } from "@/hooks/reporting/use_fetch_order_best_sold_by_restaurant_id";

type StatTableBestSoldProps = {
  dateMin: string;
  idRestaurant: number;
};

export const StatTableBestSold = ({
  dateMin,
  idRestaurant,
}: StatTableBestSoldProps) => {
  const bestContents = useFetchOrderBestContentsByRestaurantId(
    dateMin,
    new Date().toISOString(),
    idRestaurant
  );

  return (
    <div className="w-full p-4 bg-white rounded-md flex flex-col gap-4">
      {idRestaurant ? (
        dateMin ? (
          bestContents.data?.map((product, key) => {
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
                  <span>{product.salesCount}</span>
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
