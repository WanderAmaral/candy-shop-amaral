import { Prisma, Product } from "@prisma/client";

interface CandyProductProps {
  product: Prisma.ProductGetPayload<{
    include: {
      company: true;
    };
  }>;
}

const CandyProduct = ({ product }: CandyProductProps) => {
  return <div>{product.company.name}</div>;
};

export default CandyProduct;