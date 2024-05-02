"use client";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";

import { z } from "zod";
import { signIn } from "next-auth/react";

const formSchema = z.object({
  email: z.string(),
  password: z.string(),
});

const Auth = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleOnSubmit = form.handleSubmit(async (data) => {
    try {
      signIn("credentials", {
        email: data.email,
        password: data.password,
        callbackUrl: "/profile", // Redireciona para a página de perfil após o login
      });
    } catch (error) {
      console.log(error);
    }
  });

  return (
    <>
      <div className="h-screen mx-auto max-w-[360px] mt-16">
        <Form {...form}>
          <form onSubmit={handleOnSubmit}>
            <div className="flex flex-col w-full gap-8">
              <div className=" text-center flex flex-col gap-4">
                <h1 className="font-semibold text-3xl capitalize">entrar</h1>
                <p className="text-lg">Entrar na sua conta</p>
              </div>
              <Label className="text-xl font-semibold">Email</Label>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="hello@reallygreatsite.com"
                        className="border-zinc-300 border-b-2"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Label className="text-xl font-semibold">Senha</Label>
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="********"
                        className="border-zinc-300 border-b-2"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Link href={"/register"}>
                <div className="flex justify-end">
                  <p className="border-zinc-300 border-b-2 pb-2 hover:text-zinc-400">
                    Ainda não tem uma conta?
                  </p>
                </div>
              </Link>
              <div className="flex flex-col gap-11">
                <Button className=" bg-color-dark text-xl hover:bg-color-darker h-14 rounded-2xl">
                  Login
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </div>
    </>
  );
};

export default Auth;
