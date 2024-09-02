import { useCartStore } from "@/app/_store/cart";
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
  Settings,
  ShoppingBasket,
  User,
} from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

const MenuSheet = () => {
  const handleLogout = () => {
    signOut();
  };

  const { status, data: session } = useSession();



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
            {status === "authenticated" && (
              <SheetClose asChild>
                <Button
                  asChild
                  variant={"outline"}
                  className="w-full text-left justify-start gap-4"
                >
                  <Link href={"/profile/history"}>
                    <ShoppingBasket size={24} />
                    Minhas compras
                  </Link>
                </Button>
              </SheetClose>
            )}

            {session?.user.role === "company" && (
              <SheetClose asChild>
                <Button
                  asChild
                  variant={"outline"}
                  className="w-full text-left justify-start gap-4"
                >
                  <Link href={"/profile/products"}>
                    <Package size={24} />
                    Meus produtos
                  </Link>
                </Button>
              </SheetClose>
            )}

            {status === "authenticated" && (
              <SheetClose asChild>
                <Link href={"/profile/settings"}>
                  <Button
                    variant={"outline"}
                    className="w-full text-left justify-start gap-4"
                  >
                    <Settings size={24} />
                    Configuração
                  </Button>
                </Link>
              </SheetClose>
            )}
            {status === "authenticated" && (
              <SheetClose asChild>
                <Link href={"/auth"}>
                  <Button
                    onClick={handleLogout}
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
