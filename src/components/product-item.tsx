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
    <div className="p-5">
      <h1 className="text-xl font-semibold pb-2">{company.name}</h1>
      <div className="flex gap-3 overflow-x-auto">
        {company.products.map((product) => (
          <ProductCard product={product} key={product.id} />
        ))}
      </div>
    </div>
  );
};

export default CandyProduct;
