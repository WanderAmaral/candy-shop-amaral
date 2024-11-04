"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { createAccount } from "../_actions/auth-action";
import { ClipLoader } from "react-spinners";

const formSchema = z.object({
  name: z.string().nonempty("O campo nome é obrigatório"),
  email: z.string().email("Insira um e-mail válido"),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
  role: z.union([z.literal("company"), z.literal("client")]),
});

const CreateAcount = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const handleOnSubmit = form.handleSubmit(async (data) => {
    setIsLoading(true);
    try {
      await createAccount({
        name: data.name,
        email: data.email,
        role: data.role,
        password: data.password,
      });
      setErrorMessage("");
    } catch (error) {
      setErrorMessage("Erro ao criar conta. Por favor, tente novamente.");
      console.log(error);
    } finally {
      setIsLoading(true);
    }
  });

  return (
    <>
      <Form {...form}>
        <form onSubmit={handleOnSubmit}>
          <div className="h-screen mx-auto max-w-[360px] mt-10">
            <div className="flex flex-col w-full gap-5">
              <div className="text-center flex flex-col gap-4">
                <h1 className="font-semibold text-3xl capitalize">
                  Criar Conta
                </h1>
                <p className="text-lg">Ainda não tem uma conta? Registre-se.</p>
              </div>

              {errorMessage && (
                <div className="text-red-500 text-center mb-4">
                  {errorMessage}
                </div>
              )}

              <Label className="text-xl font-semibold">Nome</Label>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Jhon Doe"
                        className="border-zinc-300 border-b-2"
                        {...field}
                      />
                    </FormControl>
                    {form.formState.errors.name && (
                      <span className="text-red-500 text-sm">
                        {form.formState.errors.name.message}
                      </span>
                    )}
                  </FormItem>
                )}
              />

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
                        placeholder="**********"
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

              <Label className="uppercase text-lg font-semibold">
                Empresa/Cliente
              </Label>
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Empresa/Cliente" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="company">Empresa</SelectItem>
                          <SelectItem value="client">Cliente</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    {form.formState.errors.role && (
                      <span className="text-red-500 text-sm">
                        Selecione uma função!
                      </span>
                    )}
                  </FormItem>
                )}
              />

              <div className="flex flex-col mt-8">
                <Button
                  type="submit"
                  className={`bg-color-dark text-xl hover:bg-color-darker text-white h-14 rounded-2xl flex items-center justify-center ${
                    isLoading ? "opacity-50" : ""
                  }`}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <ClipLoader
                        size={20}
                        color={"white"}
                        loading={isLoading}
                      />{" "}
                      <span className="ml-2">Carregando...</span>{" "}
                    </>
                  ) : (
                    "Login"
                  )}
                </Button>
              </div>
            </div>
          </div>
        </form>
      </Form>
    </>
  );
};

export default CreateAcount;
