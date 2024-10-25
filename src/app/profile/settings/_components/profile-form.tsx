"use client";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { Session } from "next-auth";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useSession } from "next-auth/react";

import { updateUserTypes } from "../actions/action-type";
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
import { updateUser } from "../actions/action-update";

interface ProfileFormProps {
  defaultValues: Session["user"];
}

const ProfileForm = ({ defaultValues }: ProfileFormProps) => {
  const { update, data: session } = useSession();
  const router = useRouter()

  const form = useForm<z.infer<typeof updateUserTypes>>({
    resolver: zodResolver(updateUserTypes),
    defaultValues: {
      name: defaultValues?.name ?? "",
      email: defaultValues?.email ?? "",
    },
  });

  const handleOnSubmit = form.handleSubmit(async (data) => {
    await update(data);
    await updateUser(data)
    toast({
      title: "Sucesso",
      description: "Seu perfil foi atualizado com sucesso.",
    });
    router.refresh()
  });

  return (
    <Form {...form}>
      <form onSubmit={handleOnSubmit}>
        <div className="flex flex-col w-full gap-5 pt-1 justify-between">
          <h1 className="text-2xl font-semibold py-3">Atualizar dados</h1>
          {session?.user.role === "client" && (
            <Label className="text-xl font-medium">Nome de usuario</Label>
          )}
          {session?.user.role === "company" && (
            <Label className="text-xl font-medium">Nome da empresa</Label>
          )}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="Novo nome"
                    type="text"
                    className="border-zinc-300 border-b-2 bg-color-lightest w-full"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
  
          <Label className="text-xl font-medium">Alterar email</Label>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="jhondoe@gmail.com"
                    type="email"
                    className="border-zinc-300 border-b-2 bg-color-lightest w-full"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <Label className="text-xl font-medium">Função</Label>
          <Input
            disabled
            defaultValue={session?.user.role}
            className="border-zinc-300 border-b-2 bg-color-lightest w-full"
          />
          <span className="text-sm text-slate-400">
            Para trocar a função, favor, entrar em contato com o administrador.
          </span>
          <div className="flex flex-col sm:flex-row gap-4">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  type="button"
                  variant={"destructive"}
                  className="rounded-xl text-xl w-full"
                >
                  Deletar conta
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent className="w-[90%] rounded-xl">
                <AlertDialogHeader>
                  <AlertDialogTitle>Deletar Conta</AlertDialogTitle>
                  <AlertDialogDescription>
                    Tem certeza que deseja excluir sua conta?
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter className="flex-row gap-3">
                  <AlertDialogCancel className="w-full mt-0">
                    Cancelar
                  </AlertDialogCancel>
                  <AlertDialogAction className="w-full bg-color-primary hover:bg-color-light">
                    Excluir
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
            <Button
              disabled={form.formState.isLoading}
              type="submit"
              className="text-xl rounded-xl bg-color-primary hover:bg-color-light w-full"
            >
              {form.formState.isSubmitting ? "Salvando..." : "Atualizar"}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default ProfileForm;
