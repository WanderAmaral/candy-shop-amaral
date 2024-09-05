"use client";

import { useCartStore } from "@/app/_store/cart";
import { CartType } from "@/app/_types/cart-type";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";
import { Prisma } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

interface ProductInfoUserProps {
  product: Prisma.ProductGetPayload<{
    include: { user: { select: { name: true; id: true; email: true } } };
  }>;
}

const ProductInfoUser = ({ product }: ProductInfoUserProps) => {
  const { addProductToCart, products } = useCartStore();
  const { status } = useSession();
  const router = useRouter();

  const handleAddProductToCart = () => {
    try {
      if (status === "unauthenticated") {
        return router.push("/auth");
      }
      const productToAdd: CartType = {
        id: product.id,
        name: product.name,
        price: product.price,
        description: `Experimente nosso delicioso ${product.name}, uma explosão de sabor em cada mordida!`,
        imageURL: product.imageURL ?? "",
        userId: product.userId,
        companyId: product.companyId,
      };
      addProductToCart(productToAdd);
      toast({
        title: "Sucesso",
        description: "Produto adicionado ao carrinho",
      });
    } catch (error) {
      console.log(error);
    }
  };

  console.log(products);
  return (
    <div key={product.id}>
      <Card>
        <CardContent className="p-0 bg-color-lighter">
          <div className="h-full py-14 flex gap-16 justify-center">
            <Card>
              <CardContent className="flex flex-col justify-between h-full px-2 w-96 gap-4">
                <CardHeader className="text-2xl font-bold px-0">
                  {product.name}
                </CardHeader>
                <h1 className="font-bold text-xl">
                  {Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(Number(product.price))}
                </h1>
                <p className="text-justify">{`Está na hora de elevar sua experiência gastronômica a um novo patamar! Apresentamos com orgulho nossos ${product.name}, uma verdadeira explosão de sabor em cada mordida.`}</p>
                <Button
                  onClick={handleAddProductToCart}
                  className="bg-color-primary  hover:bg-color-dark hover:text-white text-black "
                >
                  Adicionar ao carrinho
                </Button>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
      {product.user && (
        <div className="mt-6">
          <h2 className="text-lg font-bold">Vendedor:</h2>
          <p>Nome: {product.user.name}</p>
          <p>Email: {product.user.email}</p>
        </div>
      )}
    </div>
  );
};

export default ProductInfoUser;
