import { FunctionComponent } from "react";
import { TableCell, TableRow } from "@/components/ui/table";
import { useFetchIngredientById } from "@/hooks/catalog/use_fetch_ingredient_by_id";
import { convertDateToFr } from "@/utils/function";
import { Plus, ShoppingBag } from "lucide-react";

type StocksTableRowProps = {
  idIngredient: number;
  quantity: number;
};

export const StocksTableTow: FunctionComponent<StocksTableRowProps> = ({
  idIngredient,
  quantity,
}) => {
  const ingredient = useFetchIngredientById(idIngredient);

  if (!ingredient.data) return <div>loading...</div>;
  return (
    <TableRow>
      <TableCell>{ingredient.data?.name}</TableCell>
      <TableCell>{ingredient.data?.is_allergen ? "Oui" : "Non"}</TableCell>
      <TableCell>{convertDateToFr(ingredient.data?.CreatedAt)}</TableCell>
      <TableCell className={`${quantity < 5 && "text-red-500"}`}>
        {quantity}
      </TableCell>
    </TableRow>
  );
};
