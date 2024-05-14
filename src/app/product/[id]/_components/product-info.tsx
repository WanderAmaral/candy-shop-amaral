import CandyProduct from "@/components/product-item";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Prisma, Product } from "@prisma/client";
import Image from "next/image";

interface ProductInfoProps {
  product: Product;
}

const ProductInfo = ({ product }: ProductInfoProps) => {
  const imageURL = product.imageURL ?? "";

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
                <Button>Adicionar ao carrinho</Button>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default ProductInfo;
