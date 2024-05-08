import CandyProduct from "@/components/product-item";
import { prisma } from "../_modules/services/database/prisma";

export default async function Home() {
  const company = await prisma.company.findMany({
    include: {
      products: true,
    },
  });

  
  return (
    <div className=" bg-color-lighter">
      {company.map((company) => (
        <CandyProduct company={company} key={company.id} />
      ))}
    </div>
  );
}
