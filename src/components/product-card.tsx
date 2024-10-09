"use client";
import { Product } from "@prisma/client";
import Image from "next/image";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { cn } from "@/_lib/utils";

interface ProductCardProps {
  product: Product;
  className?: string;
}

const ProductCard = ({ product, className }: ProductCardProps) => {
  const imageURL = product.imageURL ?? "";

  const router = useRouter();

  const handleClickItemProduct = () => {
    router.push(`/product/${product.id}`);
  };

  return (
    <div className="flex items-center p-0 rounded-sm shadow-custom">
      <div
        className={cn(
          " flex h-[250px] min-w-[500px] max-h-[200px] max-w-[550px] rounded-sm border",
          className
        )}
      >
        <Image
          src={imageURL}
          alt={product.name}
          width={0}
          height={0}
          style={{ objectFit: "cover" }}
          sizes="100vh"
          className="rounded-sm h-full w-full"
        />
        <div className="flex flex-col p-4 gap-3 justify-between">
          <p className="font-semibold text-sm">{product.name}</p>
          <p className="font-bold">
            {Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
            }).format(Number(product.price))}
          </p>
          <Button
            onClick={handleClickItemProduct}
            className=" bg-color-primary text-black uppercase rounded-lg w-full hover:bg-color-dark hover:text-white"
          >
            Detalhes
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
