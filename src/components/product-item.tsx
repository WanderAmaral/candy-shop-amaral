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
      <div className="pt-3">
        <span className="italic text-xl">Empresa: </span>
        <span className="text-xl font-semibold capitalize">{company.name}</span>
      </div>
      <div className="flex sm:flex-row sm:gap-3 gap-3 overflow-x-auto p-5">
        {company.products.map((product) => (
          <ProductCard product={product} key={product.id} />
        ))}
      </div>
    </div>
  );
};

export default CandyProduct;
