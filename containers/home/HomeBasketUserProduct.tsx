import { BaseNbSelect } from "@/components/input/SelectNbProduct";
import { useToast } from "@/components/ui/use-toast";
import { useFetchProductByID } from "@/hooks/catalog/use_fetch_product_by_id";
import { updateBasket } from "@/services/Basket";
import { Basket, CardProduct, User } from "@/utils/types";
import { Trash2 } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";

type HomeBasketUserProductProps = {
  /**
   * Identifiant du contenu
   */
  productSent: CardProduct;
  /**
   * Permet d'envoyer au container parent un booleen pour actualiser les données
   * @param n any
   * @returns void
   */
  onUpdateCart: (n: any) => void;

  basket: Basket;
};

export const HomeBasketUserProduct = ({
  productSent,
  onUpdateCart,
  basket,
}: HomeBasketUserProductProps) => {
  const { toast } = useToast();
  const product = useFetchProductByID(productSent.idContent);

  //Ref
  const refBaseNbSelect = useRef<HTMLSelectElement>(null);

  const updateQuandityBasket = (id: number) => {
    if (!refBaseNbSelect.current || !basket) return;
    onUpdateCart(true);

    const products = basket.products;

    for (let i = 0; i < products.length; i++) {
      if (products[i].idContent === id) {
        basket.products[i].quantity = Number(refBaseNbSelect.current.value);
        updateBasket(basket).then(() => {
          toast({
            title: "Produit mis à jour",
            description: `Le produit a été modifié`,
          });
        });
        return;
      }
    }
  };

  /**
   * Fonction qui supprime un produit du panier
   * @param id id du produit
   * @returns Le tableau des produits sans le produit supprimé
   */
  const deleteFromBasket = (id: number) => {
    if (!basket) return;
    const products = basket.products;
    onUpdateCart(true);
    for (let i = 0; i < products.length; i++) {
      if (products[i].idContent === id) {
        basket.products.splice(i, 1);
        updateBasket(basket).then(() => {
          toast({
            title: "Produit supprimé",
            description: `Le produit a été supprimé du panier`,
          });
        });
        return;
      }
    }
  };

  if (!product.data) return <div>loaging...</div>;

  return (
    <div className="w-full flex">
      <div className="w-1/3">
        <Image
          className="object-cover h-24"
          src={product.data.image}
          alt={product.data.name}
          width={90}
          height={90}
        />
      </div>{" "}
      <div className="w-2/3 flex flex-col">
        <div className="flex justify-between">
          <span>{product.data.name}</span>
          <span>
            <BaseNbSelect
              ref={refBaseNbSelect}
              onChange={() => updateQuandityBasket(product.data.ID)}
              defaultValue={productSent.quantity}
            />
          </span>
        </div>
        <div className="flex gap-1 h-full w-full justify-end items-end">
          <span>
            {product.data &&
              (Number(productSent.quantity) * product.data?.price).toFixed(2)}
            €
          </span>
          <span className="pb-1">
            <Trash2
              className="cursor-pointer text-red-500 w-5 h-5"
              onClick={() => deleteFromBasket(product.data.ID)}
            />
          </span>
        </div>
      </div>
    </div>
  );
};
