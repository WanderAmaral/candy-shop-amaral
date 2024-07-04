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
      <div className="py-2">
        <span className="italic text-xl">Empresa: </span>
        <span className="text-xl font-semibold capitalize">{company.name}</span>
      </div>
      <div className="flex gap-3 overflow-x-auto">
        {company.products.map((product) => (
          <ProductCard product={product} key={product.id} />
        ))}
      </div>
    </div>
  );
};

export default CandyProduct;
