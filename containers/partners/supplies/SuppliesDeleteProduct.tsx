import { FunctionComponent } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/components/ui/use-toast";
import { deleteProduct } from "@/services/Product";
import { Trash } from "lucide-react";
import { useQueryClient } from "react-query";

type SuppliesDeleteProductProps = {
  idProduct: number;
  refetch: () => void;
};

export const SuppliesDeleteProduct: FunctionComponent<
  SuppliesDeleteProductProps
> = ({ idProduct, refetch }) => {
  const { toast } = useToast();

  const queryClient = useQueryClient();

  const submit = () => {
    deleteProduct(idProduct)
      .then(() => {
        toast({
          title: "Produit supprimé",
          description: "Le produit a bien été supprimé",
        });
        refetch();
      })
      .catch(() => {
        toast({
          variant: "destructive",
          title: "Erreur",
          description: "Une erreur est survenue",
        });
      });
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Trash className="h-5 w-5 cursor-pointer hover:text-red-500" />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Supprimer un produit</AlertDialogTitle>
          <AlertDialogDescription>
            Vous êtes sur de supprimer ce produit ? Cette action est
            irréversible
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Annuler</AlertDialogCancel>
          <AlertDialogAction onClick={submit}>Supprimer</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
