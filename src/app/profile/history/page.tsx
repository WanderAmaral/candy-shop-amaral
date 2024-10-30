import { authOptions } from "@/_lib/auth";
import { prisma } from "@/app/_modules/services/database/prisma";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import OrderCard from "./_components/card-order";

const HistoryPage = async () => {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return redirect("/");
  }

  const orders = await prisma.order.findMany({
    where: {
      userId: session.user.id,
    },
    include: {
      user: true,
      orderItems: {
        include: {
          product: {
            include: {
              company: true,
            },
          },
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  const mappedOrders = orders.map((order) => ({
    ...order,
    orderItems: order.orderItems.map((item) => ({
      ...item,
      price: Number(item.price),
      product: {
        ...item.product,
        price: Number(item.product.price),
      },
    })),
  }));

  return (
    <>
      <div className="flex flex-col md:flex-row justify-between items-center pt-10 border-b border-zinc-500 pb-4">
        <h1 className="font-semibold text-xl">Histórico de pedidos</h1>
      </div>
      <ScrollArea className="h-[330px] pt-4 rounded-md w-full md:w-[50%]">
        <div className="md:flex md:flex-col flex flex-col gap-5 md:gap-4  w-full md:pr-4">
          {mappedOrders.map((order) => (
            <OrderCard order={order} key={order.id} />
          ))}
        </div>
      </ScrollArea>
    </>
  );
};

export default HistoryPage;
