import { prisma } from "@/app/_modules/services/database/prisma";
import ProductInfoUser from "./_components/product-info-user";
import { Card } from "@/components/ui/card";

interface ProductDetailsUserPageProps {
  params: {
    id?: string;
  };
}

const ProductDetailsUserPage = async ({
  params,
}: ProductDetailsUserPageProps) => {
  const product = await prisma.product.findUnique({
    where: {
      id: params.id,
    },
    include: {
      user: true,
    },
  });

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="py-6 px-16">
      <ProductInfoUser product={product} />
      <h1 className="font-bold text-xl py-4">Produtos Similares</h1>
      {/* Se você tiver produtos similares para mostrar */}
      {/* <Card className="overflow-x-auto gap-4 p-4 flex ">
        {company?.products.map((product) => (
          <ProductCard product={product} key={product.id} />
        ))}
      </Card> */}
    </div>
  );
};

export default ProductDetailsUserPage;
