"use client";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

interface OrderCardCompanyProps {
  order: {
    id: string;
    user: {
      id: string;
      name: string;
    };
    orderItems: Array<{
      id: string;
      price: number;
      product: {
        id: string;
        name: string;
        price: number;
        imageURL?: string | null;
        company?: {
          id: string;
          name: string;
        } | null;
      };
      quantity: number;
    }>;
  };
}

const OrderCard = ({ order }: OrderCardCompanyProps) => {
  return (
    <>
      {order.orderItems.map((item) => (
        <Card key={item.id} className="md:h-full">
          <CardContent className="md:flex md:p-0 md:justify-between  md:items-start flex flex-col p-0">
            <div className="md:flex md:w-full gap-3 ">
              <Image
                src={item.product.imageURL || "/default.jpg"}
                alt={item.product.name}
                height={0}
                width={0}
                sizes="100vh"
                className="w-24 h"
                
              />
              <div className="flex md:w-full flex-col gap-5 md:gap-2 justify-between py-2">
                <p className="font-bold mt-2 text-ellipsis overflow-hidden text-xs md:text-sm">
                  {item.product.name}
                </p>
                <div className="md:flex md:justify-between flex flex-col gap-3">
                  <p className="text-ellipsis overflow-hidden text-xs font-bold md:text-sm">
                    <span className="text-gray-500">Empresa:</span>{" "}
                    {item.product.company?.name || order.user.name}
                  </p>
                  <p className="text-sm text-gray-400 text-ellipsis overflow-hidden text-nowrap md:text-sm">
                    {Intl.NumberFormat("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    }).format(Number(item.price))}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </>
  );
};

export default OrderCard;
