"use client";

import { CartType } from "@/app/_types/cart-type";
import Image from "next/image";
import { cn } from "@/_lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface productItemCartProps {
  product: CartType;
  className?: string;
}

const ProductItemCart = ({ product, className }: productItemCartProps) => {
  const truncateName = (name: string) => {
    return name.split(" ").slice(0, 3).join(" ");
  };

  return (
    <div className="flex items-center p-0 rounded-sm ">
      <div
        className={cn(
          "flex h-[250px] max-h-[200px] rounded-sm border overflow-hidden shadow-custom", 
          className
        )}
      >
        <Image
          src={product.imageURL || "/default.jpg"}
          alt={product.name}
          width={0}
          height={0}
          style={{ objectFit: "contain" }}
          sizes="100vh"
          className="rounded-sm h-full w-[200px]"
        />
        <div className="flex flex-col px-4 py-5 gap-4">
          <p className="font-semibold text-sm text-left">
            {truncateName(product.name)}
          </p>
          <p className="font-bold">
            {Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
            }).format(Number(product.price))}
          </p>
          <div className="flex gap-3 items-center">
            <Button className="bg-white border" size={"icon"}>
              <ChevronLeft />
            </Button>
            1
            <Button className="bg-white border " size={"icon"}>
              <ChevronRight />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductItemCart;
