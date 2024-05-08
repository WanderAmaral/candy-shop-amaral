import CandyProduct from "@/components/product-item";
import { prisma } from "../_modules/services/database/prisma";
import axios from "axios";
import FetchUser from "./_components/fetch-user";

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
      {/* <FetchUser /> */}
    </div>
  );
}
