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
import { redirect } from "next/navigation";
import { updateUser } from "../actions/action-update";
import { updateUserTypes } from "../actions/action-type";
import { useRouter } from "next/navigation";
import { toast } from "@/components/ui/use-toast";

interface ProfileFormProps {
  defaultValues: Session["user"];
}

const ProfileForm = ({ defaultValues }: ProfileFormProps) => {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (!session) {
    redirect("/auth");
  }

  console.log(session);

  const form = useForm<z.infer<typeof updateUserTypes>>({
    resolver: zodResolver(updateUserTypes),
    defaultValues: {
      name: defaultValues?.name ?? "",
      email: defaultValues?.email ?? "",
    },
  });

  const handleOnSubmit = form.handleSubmit(async (data) => {
    await updateUser(data);
    toast({
      title: "Sucesso",
      description: "Seu perfil foi atualizado com sucesso.",
    });
    router.refresh();
  });

  return (
    <>
      <Form {...form}>
        <form onSubmit={handleOnSubmit}>
          <div className="flex flex-col w-full gap-6 pt-1 justify-between">
            <h1 className=" text-2xl font-semibold py-3">Atualizar dados</h1>
            <Label className="text-xl font-medium">Alterar nome</Label>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Novo nome"
                      type="text"
                      className="border-zinc-300 border-b-2 bg-color-lightest"
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
                      className="border-zinc-300 border-b-2 bg-color-lightest"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <div className="flex pt-2 gap-4">
              {/* <Button
                variant={"destructive"}
                type="submit"
                className="rounded-2xl text-xl"
              >
                Deletar conta
              </Button> */}
              <Button
                type="submit"
                className=" bg-color-dark text-xl hover:bg-color-darker rounded-2xl"
              >
                Atualizar
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </>
  );
};

export default ProfileForm;
