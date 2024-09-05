"use client";

import { CartType } from "@/app/_types/cart-type";
import Image from "next/image";
import { cn } from "@/_lib/utils";

interface productItemCartProps {
  product: CartType;
  className?: string;
}

const ProductItemCart = ({ product, className }: productItemCartProps) => {
  return (
    <div className="flex items-center p-0 rounded-sm shadow-custom">
      <div
        className={cn(
          " flex h-[250px] min-w-[500px] max-h-[200px] max-w-[550px] rounded-sm border ",
          className
        )}
      >
        <Image
          src={product.imageURL || "/default.jpg"}
          alt={product.name}
          width={0}
          height={0}
          style={{ objectFit: "cover" }}
          sizes="100vh"
          className="rounded-sm h-full w-full"
        />
        <div className="flex flex-col px-4 py-5 justify-between">
          <p className="font-semibold text-sm text-center">{product.name}</p>
          <p className="font-bold">
            {Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
            }).format(Number(product.price))}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductItemCart;
