"use client";

import { PopupInput } from "@/components/blocks/PopupInput";
import { BaseButton } from "@/components/button/Button";
import { useToast } from "@/components/ui/use-toast";
import { HomeBasketProduct } from "@/containers/home/HomeBasketProduct";
import { createBasket } from "@/services/Basket";
import { CardProduct } from "@/utils/types";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";

type HomeBasketProps = {
  onUpdateCart: boolean;
};

export const HomeBasket = ({ onUpdateCart }: HomeBasketProps) => {
  const { toast } = useToast();
  const router = useRouter();

  const [cardProducts, setCardProducts] = useState<CardProduct[]>([]);
  const [adresseClient, setAdresseClient] = useState<string>("");

  //Constantes pour modal Popup
  const [ouvrirInput, setOuvrirInput] = useState(false);

  const [inputDialog, setInputDialog] = useState("");

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
    if (localStorage.getItem("product")) {
      setCardProducts(JSON.parse(localStorage.getItem("product") as string));
    }
    if (localStorage.getItem("address")) {
      setAdresseClient(localStorage.getItem("address") as string);
    }
  }, [onUpdateCart, updateShoppingCart]);

  const confirmCommand = () => {
    if (adresseClient == "") {
      setOuvrirInput(false);
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Veuillez renseigner votre adresse de livraison",
      });
    } else {
      const products = cardProducts.map((val) => {
        return {
          idContent: val.idContent,
          contentName: val.contentName,
          quantity: val.quantity,
        };
      });
      const orderBody = {
        userId: inputDialog,
        products: products,
      };
      createBasket(orderBody).then(() => {
        router.push("/validate");
      });
    }
  };

  const openInput = (event: FormEvent) => {
    event.preventDefault();
    setOuvrirInput(true);
  };

  const getInputDialog = (n: string) => {
    setInputDialog(n);
  };

  const fermer = () => {
    setOuvrirInput(false);
  };

  return cardProducts.length > 0 ? (
    <div className="p-4 flex flex-col">
      <div className="pb-6 flex flex-col gap-3">
        {cardProducts.map((product) => {
          return (
            <HomeBasketProduct
              key={product.idContent}
              productSent={product}
              onUpdateCart={toogleFromChild}
            />
          );
        })}
      </div>
      <div className="w-full flex justify-end">
        <BaseButton variant="primary" label="Commander" onClick={openInput} />
        <PopupInput
          btnLbl="Commander"
          title="Confirmation de commande"
          content={`Souhaitez-vous vraiment commander ces produits ?`}
          ouvrir={ouvrirInput}
          fermer={fermer}
          submit={confirmCommand}
          inputValue={getInputDialog}
        />
      </div>
    </div>
  ) : (
    <div className="w-full h-full flex justify-center items-center">
      Ajouter des produits à votre panier
    </div>
  );
};
