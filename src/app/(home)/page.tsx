import CandyProduct from "@/components/product-item";
import { prisma } from "../_modules/services/database/prisma";
import ProductCardUser from "@/components/product-card-user";

export default async function Home() {
  const companies = await prisma.company.findMany({
    include: {
      products: true,
    },
  });
  const users = await prisma.user.findMany({
    include: { products: true },
  });

  return (
    <div className="bg-color-lighter">
      <div className="p-5">
        {users.map((user) => (
          <div key={user.id}>
            {user.products.length > 0 ? (
              <>
                <span className="italic text-xl">Empresa: </span>
                <span className="text-xl font-semibold pb-2">{user.name}</span>
                <div className="flex gap-3 overflow-x-auto">
                  {user.products.map((product) => (
                    <ProductCardUser
                      user={{ ...user, products: [product] }}
                      key={product.id}
                    />
                  ))}
                </div>
              </>
            ) : null}
          </div>
        ))}
      </div>
      {companies.map((company) => (
        <CandyProduct company={company} key={company.id} />
      ))}
    </div>
  );
}
