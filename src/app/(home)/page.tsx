import CandyProduct from "@/components/product-item";
import { prisma } from "../_modules/services/database/prisma";
import { getServerSession } from "next-auth";

export default async function Home() {
  const company = await prisma.company.findMany({
    include: {
      products: true,
    },
  });

  const session = await getServerSession();

  console.log()

 
  return (
    <div className=" bg-color-lighter">
      {company.map((company) => (
        <CandyProduct company={company} key={company.id} />
      ))}
      
    </div>
  );
}
