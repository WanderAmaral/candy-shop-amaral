import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Product } from "@prisma/client";
import { PencilLine, X } from "lucide-react";
import Image from "next/image";

interface ProductsCardCompanyProps {
  product: Product;
}

const ProductsCardCompany = ({ product }: ProductsCardCompanyProps) => {
  return (
    <Card className=" w-[50%] h-[80px]">
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
          <Button size={"sm"}>
            <X size={18} />
          </Button>
          <Button size={"sm"}>
            <PencilLine size={18} />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductsCardCompany;
