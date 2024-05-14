import { prisma } from "@/app/_modules/services/database/prisma";
import ProductInfo from "./_components/product-info";
import CandyProduct from "@/components/product-item";
import ProductCard from "@/components/product-card";
import { Card, CardContent } from "@/components/ui/card";

interface ProductDatailsPageProps {
  params: {
    id?: string;
  };
}

const ProductDatailsPage = async ({ params }: ProductDatailsPageProps) => {
  const product = await prisma.product.findUnique({
    where: {
      id: params.id,
    },
  });

  const company = await prisma.company.findUnique({
    where: {
      id: product?.companyId,
    },
    include: { products: true },
  });

  if (!product) {
    return null;
  }

  return (
    <div className="py-6 px-16">
      <ProductInfo product={product} />
      <h1 className="font-bold text-xl py-4">Produtos Similares</h1>
      <Card className="overflow-x-auto gap-4 p-4 flex ">
        {company?.products.map((product) => (
          <ProductCard product={product} key={product.id} />
        ))}
      </Card>
    </div>
  );
};

export default ProductDatailsPage;
