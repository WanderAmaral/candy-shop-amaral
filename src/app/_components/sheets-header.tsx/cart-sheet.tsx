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

const CartSheet = () => {
  const { products } = useCartStore();

  const quantityProductsToCart = products.reduce(
    (total, product) => total + (product.quantity || 1),
    0
  );
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
        <SheetContent>
          <SheetTitle>Seu Carrinho</SheetTitle>
          <div className="flex flex-col gap-5">
            {products.map((product) => (
              <ProductItemCart
                product={product}
                key={product.id}
                className="h-[250px] min-w-[300px] max-h-[200px]"
              />
            ))}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default CartSheet;
