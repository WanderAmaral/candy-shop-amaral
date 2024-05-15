"use client";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "@/components/ui/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { createCompanyTypes } from "../actions/form-action-types";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";

const CreateCompanyForm = () => {
  const form = useForm<z.infer<typeof createCompanyTypes>>({
    resolver: zodResolver(createCompanyTypes),
    defaultValues: {
      name: "",
      phone: "",
      adress: "",
    },
  });

  const handleOnSubmit = form.handleSubmit(async (data) => {
    console.log(data);
    toast({
      title: "Sucesso",
      description: "Empresa criada com sucesso",
    });
  });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Criar Empresa</Button>
      </DialogTrigger>
      <DialogContent>
        <Form {...form}>
          <form onSubmit={handleOnSubmit}>
            <div className="flex flex-col w-full gap-6 pt-1 justify-between">
              <DialogHeader className="text-2xl font-semibold py-3">
                Criar Empresa
              </DialogHeader>
              <FormItem>
                <Label className="text-xl font-medium">Nome da empresa: </Label>
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormControl>
                      <Input
                        placeholder="Novo nome"
                        type="text"
                        className="border-zinc-300 border-b-2 bg-color-lightest"
                        {...field}
                      />
                    </FormControl>
                  )}
                />
              </FormItem>

              <FormItem>
                <Label className="text-xl font-medium">Endereço:</Label>
                <FormField
                  control={form.control}
                  name="adress"
                  render={({ field }) => (
                    <FormControl>
                      <Input
                        placeholder="Av São Paulo, 2000"
                        type="adress"
                        className="border-zinc-300 border-b-2 bg-color-lightest"
                        {...field}
                      />
                    </FormControl>
                  )}
                />
              </FormItem>
              <FormItem>
                <Label className="text-xl font-medium">
                  Telefone para contato:
                </Label>
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormControl>
                      <Input
                        placeholder="11-92345-6789"
                        type="phone"
                        className="border-zinc-300 border-b-2 bg-color-lightest"
                        {...field}
                      />
                    </FormControl>
                  )}
                />
              </FormItem>

              <DialogClose asChild>
                <div className="flex pt-2 gap-4 justify-end">
                  <Button type="submit" className="rounded-2xl text-xl">
                    Criar empresa
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

export default CreateCompanyForm;
