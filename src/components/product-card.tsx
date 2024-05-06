import { Prisma, Product } from "@prisma/client";
import { Card, CardContent } from "./ui/card";
import Image from "next/image";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const imageURL = product.imageURL ?? "";

  return (
    <Card>
      <CardContent className="flex items-center justify-center">
        <div className=" flex items-center">
          <Image
            src={imageURL}
            alt={product.name}
            width={100}
            height={100}
            sizes="100vh"
          />
          {product.name}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
