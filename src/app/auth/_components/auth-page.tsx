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
import { useState } from "react";
import { ClipLoader } from "react-spinners";

// Definindo o esquema de validação com Zod
const formSchema = z.object({
  email: z.string().email("Insira um e-mail válido"),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
});

const Auth = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false); 
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleOnSubmit = form.handleSubmit(async (data) => {
    setIsLoading(true); 
    setErrorMessage(""); 

    
    const result = await signIn("credentials", {
      email: data.email,
      password: data.password,
      callbackUrl: "/profile/settings",
       
    });

    
    if (result?.error) {
      setErrorMessage("Credenciais incorretas. Verifique seu e-mail e senha.");
      form.reset(); 
    } else {
      setErrorMessage(""); 
    }

    setIsLoading(true); 
  });

  return (
    <div className="h-screen mx-auto flex items-center">
      <Form {...form}>
        <form onSubmit={handleOnSubmit}>
          <div className="flex flex-col w-[300px] gap-8">
            <div className="text-center flex flex-col gap-4">
              <h1 className="font-semibold text-3xl capitalize">entrar</h1>
              <p className="text-lg">Entre com a sua conta</p>
            </div>

            {errorMessage && (
              <div className="text-red-500 text-center mb-4">
                {errorMessage}
              </div>
            )}

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
                  {form.formState.errors.email && (
                    <span className="text-red-500 text-sm">
                      {form.formState.errors.email.message}
                    </span>
                  )}
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
                  {form.formState.errors.password && (
                    <span className="text-red-500 text-sm">
                      {form.formState.errors.password.message}
                    </span>
                  )}
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
              <Button
                type="submit"
                className={`bg-color-dark text-xl hover:bg-color-darker text-white h-14 rounded-2xl flex items-center justify-center ${
                  isLoading ? "opacity-50" : ""
                }`} 
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <ClipLoader size={20} color={"white"} loading={isLoading} />{" "}
                    <span className="ml-2">Carregando...</span>{" "}
                  </>
                ) : (
                  "Login"
                )}
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default Auth;
