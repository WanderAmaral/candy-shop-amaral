"use client";
import { useCartStore } from "@/app/_store/cart";
import { CartType } from "@/app/_types/cart-type";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Product } from "@prisma/client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface ProductInfoProps {
  product: Product;
}

const ProductInfo = ({ product }: ProductInfoProps) => {
  const imageURL = product.imageURL ?? "";

  const { status } = useSession();
  const router = useRouter();
  const { addProductToCart, products } = useCartStore();

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
    } catch (error) {
      console.log(error);
    }
  };

  console.log(products);
  return (
    <>
      <Card>
        <CardContent className="p-0 bg-color-lighter">
          <div className="h-full py-14  flex gap-16 justify-center">
            <Image
              src={imageURL}
              alt={product.name}
              width={0}
              height={0}
              sizes="100vh"
              style={{ objectFit: "contain" }}
              className="w-96 h-96 rounded-xl"
            />
            <Card>
              <CardContent className="flex flex-col justify-between h-full px-2  w-96 gap-4">
                <CardHeader className="text-2xl font-bold px-0">
                  {product.name}
                </CardHeader>
                <h1 className="font-bold text-xl">
                  {Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(Number(product.price))}
                </h1>
                <p className=" text-justify">{`Está na hora de elevar sua experiência gastronômica a um novo patamar! Apresentamos com orgulho nossos ${product.name}, uma verdadeira explosão de sabor em cada mordida.`}</p>
                <Button onClick={handleAddProductToCart} className="text-white">
                  Adicionar ao carrinho
                </Button>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default ProductInfo;
