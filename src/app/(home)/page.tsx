import CandyProduct from "@/components/product-item";
import { prisma } from "../_modules/services/database/prisma";
import ProductCard from "@/components/product-card";

export default async function Home() {
  const company = await prisma.company.findMany({
    include: {
      products: true,
    },
  });
  const userProduct = await prisma.user.findMany({
    include: { products: true },
  });

  return (
    <div className=" bg-color-lighter">
      <div className="p-5">
        {userProduct.map((user) => (
          <div key={user.id}>
            {user.products.length > 0 ? (
              <>
                <span className="italic text-xl">Empresa: </span> <span className="text-xl font-semibold pb-2">{user.name}</span>
                <div className="flex gap-3 overflow-x-auto">
                  {user.products.map((product) => (
                    <ProductCard product={product} key={product.id} />
                  ))}
                </div>
              </>
            ) : (
              <></>
            )}

          </div>
        ))}
      </div>
      {company.map((company) => (
        <CandyProduct company={company} key={company.id} />
      ))}
    </div>
  );
}
