"use client";
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
    <div className="flex items-center  w-full  p-0 rounded-sm shadow-custom">
      <div className=" flex h-[250px]    min-w-[500px] max-h-[200px] max-w-[550px] rounded-sm border">
        <Image
          src={imageURL}
          alt={product.name}
          width={0}
          height={0}
          style={{ objectFit: "cover" }}
          sizes="100vh"
          className="rounded-sm h-full w-full"
        />
        <div className="flex flex-col p-4 gap-3 ">
          <p className="font-semibold text-sm">{product.name}</p>
          <p className="font-bold">
            {Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
            }).format(Number(product.price))}
          </p>
          <Button
            onClick={handleClickItemProduct}
            className=" bg-color-primary text-black uppercase rounded-lg w-full"
          >
            Detalhes
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
