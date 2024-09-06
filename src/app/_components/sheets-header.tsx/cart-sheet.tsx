import { useCartStore } from "@/app/_store/cart";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ShoppingCart } from "lucide-react";
import ProductItemCart from "./_components/product-item-cart";
import { useMemo } from "react";

const CartSheet = () => {
  const { products } = useCartStore();

  const quantityProductsToCart = products.reduce(
    (total, product) => total + (product.quantity || 1),
    0
  );

  const produtcsTotalPrice = useMemo(() => {
    return products.reduce((acc, product) => acc + Number(product.price), 0);
  }, [products]);
  return (
    <div>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant={"ghost"}>
            <ShoppingCart size={30} />
            {quantityProductsToCart > 0 && (
              <Badge className=" absolute right-4 top-4 bg-white text-black w-3 flex items-center justify-center">
                {quantityProductsToCart}
              </Badge>
            )}
          </Button>
        </SheetTrigger>
        <SheetContent className="flex flex-col h-full w-full pb-10">
          <SheetTitle className="text-center">Seu Carrinho</SheetTitle>
          {products.length > 0 ? (
            <>
              <div className="flex flex-col gap-5 pt-5 flex-grow overflow-y-auto">
                {products.map((product) => (
                  <ProductItemCart
                    product={product}
                    key={product.id}
                    className="h-[250px] min-w-[300px] max-h-[200px]"
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
                    }).format(produtcsTotalPrice)}
                  </p>
                </div>
              </div>
              <div className="flex justify-center">
                <Button className=" bg-[#ad795b] text-xl hover:bg-color-dark text-white ">
                  Finalizar Compra
                </Button>
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
