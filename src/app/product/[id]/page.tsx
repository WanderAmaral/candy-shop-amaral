import { prisma } from "@/app/_modules/services/database/prisma";
import ProductInfo from "./_components/product-info";

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

  if (!product) {
    return null;
  }

  return (
    <div className="py-6 px-16">
      <ProductInfo product={product} />
    </div>
  );
};

export default ProductDatailsPage;
