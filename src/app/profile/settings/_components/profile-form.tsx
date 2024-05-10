"use client";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { Session } from "next-auth";
import { useForm } from "react-hook-form";

import { z } from "zod";

import { useContext } from "react";
import { UserContext } from "@/app/_contexts/user/user.context";
import { useSession } from "next-auth/react";
import { updateUserTypes } from "../actions/action-type";
import { updateUser } from "../actions/action-update";

interface ProfileFormProps {
  defaultValues: Session["user"];
}

const formSchema = z.object({
  name: z.string(),
  email: z.string(),
  password: z.string(),
});

const ProfileForm = ({ defaultValues }: ProfileFormProps) => {
  const { isAuthenticated } = useContext(UserContext);
  const { data: session, status } = useSession();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: defaultValues?.name ?? "",
      email: defaultValues?.email ?? "",
      password: "",
    },
  });

  const handleOnSubmit = form.handleSubmit(async (data) => {
    try {
      // await updateUser({
      //   id: data.id,
      //   name: data.name,
      //   email: data.email,
      //   password: data.password,
      // });
      console.log({ data });
    } catch (error) {
      console.log(error);
    }
  });

  return (
    <>
      <Form {...form}>
        <form onSubmit={handleOnSubmit}>
          <div className="flex flex-col w-full gap-4 pt-1">
            <h1 className=" text-xl italic">Atualizar dados</h1>
            <Label className="text-xl font-semibold">Alterar Nome</Label>
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

            <Label className="text-xl font-semibold">Novo email</Label>
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
            <Label className="text-xl font-semibold">Nova Senha</Label>
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="********"
                      className="border-zinc-300 border-b-2 bg-color-lightest"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <div className="flex  gap-3">
              <Button
                variant={"destructive"}
                type="submit"
                className="rounded-2xl text-xl"
              >
                Deletar conta
              </Button>
              <Button
                type="submit"
                className=" bg-color-dark text-xl hover:bg-color-darker rounded-xl"
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
