"use client";
import { useCartStore } from "@/app/_store/cart";
import { CartType } from "@/app/_types/cart-type";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";
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
  const { addProductToCart } = useCartStore();

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

  return (
    <>
      <Card>
        <CardContent className="p-0 bg-color-lighter">
          <div className="h-full py-14 flex flex-col lg:flex-row gap-8 lg:gap-16 justify-center items-center ">
            <div className="">
              <Image
                src={imageURL}
                alt={product.name}
                width={0}
                height={0}
                sizes="100vh"
                style={{ objectFit: "contain" }}
                className="w-full lg:w-96 h-64 lg:h-96 rounded-xl "
              />
            </div>
            <Card className="w-full lg:w-96">
              <CardContent className="flex flex-col justify-between h-full px-4 lg:px-2 gap-4">
                <CardHeader className="text-xl lg:text-2xl font-bold px-0">
                  {product.name}
                </CardHeader>
                <h1 className="font-bold text-lg lg:text-xl">
                  {Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(Number(product.price))}
                </h1>
                <p className="text-justify">{`Está na hora de elevar sua experiência gastronômica a um novo patamar! Apresentamos com orgulho nossos ${product.name}, uma verdadeira explosão de sabor em cada mordida.`}</p>
                <Button
                  onClick={handleAddProductToCart}
                  className="bg-color-primary hover:bg-color-dark hover:text-white text-black"
                >
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
