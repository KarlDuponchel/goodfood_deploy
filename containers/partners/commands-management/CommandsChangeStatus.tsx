import { BaseButton } from "@/components/button/Button";
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
import { changeOrderStatus } from "@/services/Delivery";

type CommandsChangeStatusProps = {
  idOrder: number;
  refetch: () => void;
};

export const CommandsChangeStatus = ({
  idOrder,
  refetch,
}: CommandsChangeStatusProps) => {
  const { toast } = useToast();
  const formData = new FormData();

  const handleStatusChange = () => {
    formData.append("file", "");
    changeOrderStatus(idOrder, "Livré", formData)
      .then(() => {
        toast({
          title: "Status modifié",
          description: "Le status de la commande a été modifié avec succès",
        });
        refetch();
      })
      .catch(() => {
        toast({
          variant: "destructive",
          title: "Erreur",
          description:
            "Une erreur est survenue lors de la modification du status de la commande",
        });
      });
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <BaseButton variant="black" label="Terminer" />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Modification du status</AlertDialogTitle>
          <AlertDialogDescription>
            Cette action permettra de modifier le status de la commande à Livré.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Annuler</AlertDialogCancel>
          <AlertDialogAction onClick={handleStatusChange}>
            Valider
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
