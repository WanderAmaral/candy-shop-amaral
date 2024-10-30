"use client";
import React, { useEffect, useState } from "react";
import { useCartStore } from "@/app/_store/cart";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ShoppingCart } from "lucide-react";
import ProductItemCart from "./_components/product-item-cart";
import { useSession } from "next-auth/react";
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

const CartSheet = () => {
  const { products } = useCartStore();
  const { status } = useSession();

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const quantityProductsToCart = products.reduce(
    (total, product) => total + (product.quantity || 1),
    0
  );

  const quantityTotalPriceCart = products.reduce((acc, product) => {
    return acc + Number(product.price) * (product.quantity || 1);
  }, 0);

  return (
    <div>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant={"ghost"}>
            <ShoppingCart size={30} />
            {/* Exibe o badge apenas quando o componente estiver montado */}
            {status === "authenticated" &&
              isMounted &&
              quantityProductsToCart > 0 && (
                <Badge className=" absolute right-4 top-4 bg-white text-black w-3 flex items-center justify-center">
                  {quantityProductsToCart}
                </Badge>
              )}
          </Button>
        </SheetTrigger>
        <SheetContent className="flex flex-col h-full w-[85%] pb-10">
          <SheetTitle className="text-center">Seu Carrinho</SheetTitle>
          {status === "authenticated" && isMounted && products.length > 0 ? (
            <>
              <div className="flex flex-col gap-5 pt-5 flex-grow overflow-y-auto">
                {products.map((product) => (
                  <ProductItemCart
                    product={product}
                    key={product.id}
                    className="md:h-[250px] md:min-w-[300px] md:max-h-[200px]"
                  />
                ))}
              </div>

              <div className="border-b pb-4 border-b-color-gray">
                <div className="flex justify-between">
                  <p className="text-color-gray">Preço total:</p>
                  <p>
                    {Intl.NumberFormat("pt-br", {
                      style: "currency",
                      currency: "BRL",
                    }).format(quantityTotalPriceCart)}
                  </p>
                </div>
              </div>
              <div className="flex justify-center">
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button className=" bg-[#ad795b] text-xl hover:bg-color-dark text-white ">
                      Finalizar Compra
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent className="w-[90%] rounded-xl">
                    <AlertDialogHeader>
                      <AlertDialogTitle>Finzalizar compra</AlertDialogTitle>
                      <AlertDialogDescription>
                        Tem certeza que deseja finalizar o seu pedido?
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter className="flex-row gap-3">
                      <AlertDialogCancel className="w-full mt-0">
                        Cancelar
                      </AlertDialogCancel>
                      <AlertDialogAction className="w-full bg-color-primary hover:bg-color-light">
                        Finzalizar pedido
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </>
          ) : (
            <h1 className="font-semibold text-xl">Vamos fazer compras Hoje?</h1>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default CartSheet;
