import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Home, LogOut, Menu, ShoppingBasket, User } from "lucide-react";

const MenuSheet = () => {
  return (
    <div>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant={"ghost"}>
            <Menu size={30} />
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <SheetTitle>Menu</SheetTitle>
          <div className="flex flex-col gap-6 mt-8">
            <Button
              variant={"outline"}
              className="w-full text-left justify-start gap-4 "
            >
              <User size={24} />
              Fazer Login
            </Button>
            <Button
              variant={"outline"}
              className="w-full text-left justify-start gap-4"
            >
              <Home size={24} />
              Inicio
            </Button>
            <Button
              variant={"outline"}
              className="w-full text-left justify-start gap-4"
            >
              <ShoppingBasket size={24}/>
              Minhas compras
            </Button>
            <Button
              variant={"outline"}
              className="w-full text-left justify-start gap-4"
            >
              <LogOut size={24} />
              Sair
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MenuSheet;
