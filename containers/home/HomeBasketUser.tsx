"use client";

import { Popup } from "@/components/blocks/Popup";
import { PopupInput } from "@/components/blocks/PopupInput";
import { BaseButton } from "@/components/button/Button";
import { useToast } from "@/components/ui/use-toast";
import { HomeBasketProduct } from "@/containers/home/HomeBasketProduct";
import { HomeBasketUserProduct } from "@/containers/home/HomeBasketUserProduct";
import { useFetchBasketByUserID } from "@/hooks/basket/use_fetch_basket_by_id";
import { createBasket } from "@/services/Basket";
import { CardProduct, User } from "@/utils/types";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";

type HomeBasketUserProps = {
  onUpdateCart: boolean;
  user: User;
};

export const HomeBasketUser = ({ onUpdateCart, user }: HomeBasketUserProps) => {
  const { toast } = useToast();
  const router = useRouter();

  const basket = useFetchBasketByUserID(user._id);

  const [adresseClient, setAdresseClient] = useState<string>("");

  //Constantes pour modal Popup
  const [ouvrir, setOuvrir] = useState(false);

  const [updateShoppingCart, setUpdateShoppingCart] = useState<boolean>(false);

  /**
   * Met à jour les différentes données
   * @param n any
   */
  const toogleFromChild = (n: any) => {
    if (!updateShoppingCart) {
      setUpdateShoppingCart(n);
    } else {
      setUpdateShoppingCart(!n);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("address")) {
      setAdresseClient(localStorage.getItem("address") as string);
    }
  }, [onUpdateCart, updateShoppingCart]);

  const confirmCommand = () => {
    if (adresseClient == "") {
      setOuvrir(false);
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Veuillez renseigner votre adresse de livraison",
      });
    } else {
      router.push("/validate");
    }
  };

  const openInput = (event: FormEvent) => {
    event.preventDefault();
    setOuvrir(true);
  };

  const fermer = () => {
    setOuvrir(false);
  };

  return basket.data && basket.data?.products.length > 0 ? (
    <div className="p-4 flex flex-col">
      <div className="pb-6 flex flex-col gap-3">
        {basket.data.products.map((product) => {
          return (
            <HomeBasketUserProduct
              key={product.idContent}
              productSent={product}
              onUpdateCart={toogleFromChild}
              basket={basket.data}
            />
          );
        })}
      </div>
      <div className="w-full flex justify-end">
        <BaseButton variant="primary" label="Commander" onClick={openInput} />
        <Popup
          btnLbl="Commander"
          title="Confirmation de commande"
          content={`Souhaitez-vous vraiment commander ${basket.data.products.length} article(s) ?`}
          ouvrir={ouvrir}
          fermer={fermer}
          submit={confirmCommand}
        />
      </div>
    </div>
  ) : (
    <div className="w-full h-full flex justify-center items-center">
      Ajouter des produits à votre panier
    </div>
  );
};
