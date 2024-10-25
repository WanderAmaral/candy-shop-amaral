"use client";
import { Product } from "@prisma/client";
import Image from "next/image";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { StarIcon } from "lucide-react";
import { Badge } from "./ui/badge";

interface ProductCardProps {
  product: Product;
  className?: string;
}

const ProductCard = ({ product, className }: ProductCardProps) => {
  const imageURL = product.imageURL ?? "/default.jpg";
  const router = useRouter();

  const handleClickItemProduct = () => {
    router.push(`/product/${product.id}`);
  };

  return (
    <div className={`w-[205px] rounded-2xl ${className}`}>
    <div className="flex flex-col w-full rounded-2xl border overflow-hidden">
      <div className="w-full h-[200px] relative"> 
        <div className="absolute top-2 left-2 z-50">
          <Badge className="flex items-center gap-1 opacity-90" variant="secondary">
            <StarIcon size={16} className="text-primary fill-primary" />
            <span className="text-xs">5,0</span>
          </Badge>
        </div>
        <Image
          src={imageURL}
          alt={product.name}
          width={0}
          height={0}
          style={{ objectFit: "cover" }}
          sizes="100vw"
          className="rounded-2xl"
          fill
        />
      </div>
      <div className="px-3 pb-3 w-full">
        <h2 className="font-bold mt-2 text-ellipsis overflow-hidden text-nowrap">
          {product.name}
        </h2>
        <p className="text-sm text-gray-400 text-ellipsis overflow-hidden text-nowrap">
          {Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
          }).format(Number(product.price))}
        </p>
        <Button
          onClick={handleClickItemProduct}
          variant="secondary"
          className="w-full mt-3 bg-color-primary hover:bg-color-dark hover:text-white text-black uppercase rounded-lg"
        >
          Detalhes
        </Button>
      </div>
    </div>
  </div>
  

  );
};

export default ProductCard;
