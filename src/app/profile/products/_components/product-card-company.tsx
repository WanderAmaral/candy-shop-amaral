"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Product } from "@prisma/client";
import { X } from "lucide-react";
import Image from "next/image";
import { deleteProduct } from "../actions/delete-product-action";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import UpdateProduct from "./update-product";

interface ProductsCardCompanyProps {
  product: Product;
}

const ProductsCardCompany = ({ product }: ProductsCardCompanyProps) => {
  const router = useRouter();
  const handleClickRemoveProduct = async (id: string) => {
    try {
      await deleteProduct(id);
      toast({
        title: "Sucesso",
        description: "Produto removido com sucesso",
      });
      router.refresh();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Card className=" h-[80px]">
      <CardContent className="flex p-0 justify-between">
        <div className="flex gap-3">
          <Image
            src={"/default.jpg"}
            alt="default"
            height={0}
            width={70}
            sizes="100vh"
          />
          <div className="flex flex-col justify-between py-2">
            <p>{product.name}</p>
            <p>
              {Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(Number(product.price))}
            </p>
          </div>
        </div>
        <div className="flex gap-3 pt-3 px-2">
          <Button
            className="  bg-color-primary hover:bg-color-light  rounded-lg text-black"
            size={"sm"}
            onClick={() => handleClickRemoveProduct(product.id)}
          >
            <X size={18} />
          </Button>
          <UpdateProduct product={product} />
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductsCardCompany;
