"use client";
import { Prisma } from "@prisma/client";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface ProductCardProps {
  user: Prisma.UserGetPayload<{ include: { products: true } }>;
}

const ProductCardUser = ({ user }: ProductCardProps) => {
  const router = useRouter();

  const handleClickItemProduct = (productId: string) => {
    router.push(`/product-user/${productId}`);
  };

  return (
    <div className="flex items-center p-0 rounded-sm shadow-custom ">
      {user.products.map((product) => (
        <div
          key={product.id}
          className="flex h-[250px] min-w-[500px] max-h-[200px] max-w-[550px] rounded-sm border justify-center"
        >
          
            <Image
              src={product.imageURL || "/default.jpg"}
              alt={product.name}
              width={0}
              height={0}
              style={{ objectFit: "contain" }}
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
              onClick={() => handleClickItemProduct(product.id)}
              className=" bg-color-primary  hover:bg-color-dark hover:text-white text-black uppercase rounded-lg w-full"
            >
              Detalhes
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductCardUser;
