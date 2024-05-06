import { Prisma } from "@prisma/client";
import ProductCard from "./product-card";

interface CandyProductProps {
  company: Prisma.CompanyGetPayload<{
    include: {
      products: true;
    };
  }>;
}

const CandyProduct = ({ company }: CandyProductProps) => {
  return (
    <div>
      {company.name}
      <div className="flex">
        {company.products.map((product) => (
          <ProductCard product={product} key={product.id} />
        ))}
      </div>
    </div>
  );
};

export default CandyProduct;
