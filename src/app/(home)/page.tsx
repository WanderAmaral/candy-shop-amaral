import CandyProduct from "@/components/product-item";
import { prisma } from "../_modules/services/database/prisma";
import ProductCardUser from "@/components/product-card-user";

export default async function Home() {
  const [companies, users] = await Promise.all([
    prisma.company.findMany({
      include: {
        products: true,
      },
    }),
    prisma.user.findMany({
      include: { products: true },
    }),
  ]);

  return (
    <div className="bg-color-lighter">
      <div className="container">
        {users.map((user) => (
          <div key={user.id}>
            {user.products.length > 0 ? (
              <>
                <div className="pt-3">
                  <span className="italic text-xl">Empresa: </span>
                  <span className="text-xl font-semibold capitalize">
                    {user.name}
                  </span>
                </div>
                <div className="flex gap-3 overflow-x-auto p-5">
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
      <div className="overflow-x-auto container">
        {companies.map((company) => (
          <CandyProduct company={company} key={company.id} />
        ))}
      </div>
    </div>
  );
}
