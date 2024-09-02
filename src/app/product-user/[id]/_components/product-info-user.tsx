'use client'
import { useCartStore } from "@/app/_store/cart";
import { CartType } from "@/app/_store/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Prisma } from "@prisma/client";
import Image from "next/image";

interface ProductInfoUserProps {
  product: Prisma.ProductGetPayload<{
    include: { user: { select: { name: true; id: true; email: true } } };
  }>;
}

const ProductInfoUser = ({ product }: ProductInfoUserProps) => {
  const { addProductToCart, products } = useCartStore();

  const handleAddProductToCart = () => {
    try {
      const productToAdd: CartType = {
        id: product.id,
        name: product.name,
        price: Number(product.price),
        description: `Experimente nosso delicioso ${product.name}, uma explosão de sabor em cada mordida!`, 
        imageUrl: product.imageURL ?? "",
      };
      addProductToCart(productToAdd);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(products)
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
                <Button onClick={handleAddProductToCart} className="text-white">
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
          {/* Adicione outros detalhes do usuário aqui */}
        </div>
      )}
    </div>
  );
};

export default ProductInfoUser;
