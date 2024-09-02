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
import { Button } from "@/components/ui/button";
import { signOut, useSession } from "next-auth/react";

const ButtonLogout = () => {
  const handleClickLogout = () => {
    signOut();
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="bg-color-primary  hover:bg-color-light ">Sair</Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="w-[90%] rounded-xl">
        <AlertDialogHeader>
          <AlertDialogTitle>Sair da Conta</AlertDialogTitle>
          <AlertDialogDescription>
            Tem certeza que deseja sair sua conta?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex-row gap-3">
          <AlertDialogCancel className="w-full mt-0">Voltar</AlertDialogCancel>
          <AlertDialogAction className="w-full bg-color-primary  hover:bg-color-light " onClick={handleClickLogout}>
            Sair
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ButtonLogout;
