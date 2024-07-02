import { prisma } from "@/app/_modules/services/database/prisma";
import ProductInfoUser from "./_components/product-info-user";
import { Card } from "@/components/ui/card";
import ProductCard from "@/components/product-card";
import { CompanyWithProducts } from "@/app/product/types/product-type";

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
    return null;
  }


  // const company = (await prisma.company.findUnique({
  //   where: {
  //     id: product?.companyId,
  //   },
  //   include: { products: true },
  // })) as CompanyWithProducts;

  // if (!product) {
  //   return null;
  // }

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
