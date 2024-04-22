import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ShoppingCart } from "lucide-react";

const CartSheet = () => {
  return (
    <div>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant={"ghost"}>
            <ShoppingCart size={30} />
          </Button>
        </SheetTrigger>
        <SheetContent>
          <SheetTitle>Seu Carrinho</SheetTitle>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default CartSheet;
