import CreateCompanyForm from "./_components/create-product";
import { getProductsUser } from "./actions/create-product-action";
import ProductsCardCompany from "./_components/product-card-company";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const ProductsCompany = async () => {
  const [products, session] = await Promise.all([
    getProductsUser(),
    getServerSession(),
  ]);

  if (!session) {
    redirect("/auth");
  }

  return (
    <>
      <div className=" flex justify-between items-center  pt-20 border-b border-zinc-500 pb-4">
        <h1 className="font-semibold text-xl">Meu Produtos</h1>
        <CreateCompanyForm />
      </div>

      <ScrollArea className="h-[330px] pt-4  rounded-md w-[50%]">
        <div className="flex flex-col gap-4 w-full pr-4">
          {products.map((products) => (
            <ProductsCardCompany product={products} key={products.id} />
          ))}
        </div>
        <ScrollBar orientation={"vertical"} />
      </ScrollArea>
    </>
  );
};

export default ProductsCompany;
