"use client";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "@/components/ui/use-toast";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { productFormTypes } from "../action-type/form-action-types";
import { useRouter } from "next/navigation";
import { Product } from "@prisma/client";
import { PencilLine } from "lucide-react";

interface UpdateProductProps {
  product: Product;
}

const UpdateProduct = ({ product }: UpdateProductProps) => {
  const router = useRouter();

  const form = useForm<z.infer<typeof productFormTypes>>({
    resolver: zodResolver(productFormTypes),
    defaultValues: {
      name: product.name,
      price: Number(product.price), // Define como string vazia para evitar o erro de input não controlado
    },
  });

  const handleOnSubmit = form.handleSubmit(async (data) => {
    try {
      toast({
        title: "Sucesso",
        description: "Produto atualizado",
      });
      form.reset();
      router.refresh();
    } catch (error) {
      console.log(error);
    }
  });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size={"sm"}>
          <PencilLine size={18} />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <Form {...form}>
          <form onSubmit={handleOnSubmit}>
            <div className="flex flex-col w-full gap-6 pt-1 justify-between">
              <DialogHeader className="text-2xl font-semibold py-3">
                Atualizar Produto
              </DialogHeader>
              <FormItem>
                <Label className="text-xl font-medium">Nome do Produto</Label>
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormControl>
                      <Input
                        type="text"
                        className="border-zinc-300 border-b-2 bg-color-lightest"
                        {...field}
                      />
                    </FormControl>
                  )}
                />
              </FormItem>

              <FormItem>
                <Label className="text-xl font-medium">Preço</Label>
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormControl>
                      <Input
                        type="text"
                        className="border-zinc-300 border-b-2 bg-color-lightest"
                        {...field}
                        value={
                          field.value !== undefined
                            ? String(field.value).replace(".", ",")
                            : ""
                        }
                      />
                    </FormControl>
                  )}
                />
              </FormItem>
              <DialogClose asChild>
                <div className="flex pt-2 gap-4 justify-end">
                  <Button type="submit" className="rounded-2xl text-xl">
                    Criar Produto
                  </Button>
                </div>
              </DialogClose>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateProduct;
