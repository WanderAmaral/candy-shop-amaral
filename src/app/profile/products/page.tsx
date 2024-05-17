import { getServerSession } from "next-auth";
import CreateCompanyForm from "./_components/create-company";
import { getProductsUser } from "./actions/create-product-action";
import { authOptions } from "@/_lib/auth";
import { prisma } from "@/app/_modules/services/database/prisma";
import ProductsCardCompany from "./_components/product-card-company";

const ProductsCompany = async () => {
  const products = await getProductsUser();

  return (
    <>
      <div className=" flex justify-between items-center  pt-20 border-b border-zinc-500 pb-4">
        <h1 className="font-semibold text-xl">Meu Produtos</h1>
        <CreateCompanyForm />
      </div>

      <div className="flex flex-col gap-4 mt-4">
        {products.map((products) => (
          <ProductsCardCompany product={products} key={products.id} />
        ))}
      </div>
    </>
  );
};

export default ProductsCompany;
