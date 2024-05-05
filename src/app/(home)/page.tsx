import CandyProduct from "@/components/product-item";
import { prisma } from "../_modules/services/database/prisma";

export default async function Home() {
  const products = await prisma.product.findMany({
    include: { company: true },
  });

  return (
    <div className=" bg-color-lighter h-screen">
      {products.map((product) => (
        <CandyProduct product={product} key={product.id} />
      ))}
    </div>
  );
}
