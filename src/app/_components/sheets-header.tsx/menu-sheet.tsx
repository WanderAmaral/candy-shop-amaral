import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Home,
  LogOut,
  Menu,
  Package,
  ShoppingBasket,
  User,
} from "lucide-react";
import { getServerSession } from "next-auth";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

const MenuSheet = () => {
  const handleLogout = () => {
    signOut();
  };

  const { data, status } = useSession();

  console.log(status);

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
            {status === "unauthenticated" && (
              <SheetClose asChild>
                <Link href={"/auth"}>
                  <Button
                    variant={"outline"}
                    className="w-full text-left justify-start gap-4 "
                  >
                    <User size={24} />
                    Fazer Login
                  </Button>
                </Link>
              </SheetClose>
            )}

            <SheetClose asChild>
              <Link href={"/"}>
                <Button
                  variant={"outline"}
                  className="w-full text-left justify-start gap-4"
                >
                  <Home size={24} />
                  Inicio
                </Button>
              </Link>
            </SheetClose>
            <Button
              variant={"outline"}
              className="w-full text-left justify-start gap-4"
            >
              <ShoppingBasket size={24} />
              Minhas compras
            </Button>
            <Button
              variant={"outline"}
              className="w-full text-left justify-start gap-4"
            >
              <Package size={24} />
              Meus produtos
            </Button>
            {status === "authenticated" && (
              <SheetClose asChild>
                <Link href={"/api/logout"} onClick={handleLogout}>
                  <Button
                    variant={"outline"}
                    className="w-full text-left justify-start gap-4"
                  >
                    <LogOut size={24} />
                    Sair
                  </Button>
                </Link>
              </SheetClose>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MenuSheet;
