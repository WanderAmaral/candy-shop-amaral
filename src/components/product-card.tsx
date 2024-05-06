'use client'
import { Prisma, Product } from "@prisma/client";
import { Card, CardContent } from "./ui/card";
import Image from "next/image";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const imageURL = product.imageURL ?? "";

  const router = useRouter();

  const handleClickItemProduct = () => {
    router.push(`/product/${product.id}`);
  };

  return (
    <Card>
      <CardContent className="flex items-center py-0 p-3 w-full">
        <div className=" flex h-[250px]    min-w-[500px] max-h-[200px] max-w-[550px] rounded-lg border p-2">
          <Image
            src={imageURL}
            alt={product.name}
            width={0}
            height={0}
            style={{ objectFit: "cover" }}
            sizes="100vh"
            className="rounded-lg h-full w-full"
          />
          <div className="flex flex-col p-4 gap-3">
            <p className="font-semibold text-sm">{product.name}</p>
            <p className="font-bold">R$: {Number(product.price)}</p>
            <Button
              onClick={handleClickItemProduct}
              className=" bg-color-primary text-black uppercase rounded-lg w-full"
            >
              Detalhes
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
