"use client";
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
import  { createAccount } from "@/app/auth/actions/auth-action";

const formSchema = z.object({
  name: z.string(),
  email: z.string(),
  password: z.string(),
  role: z.union([z.literal("company"), z.literal("client")]),
});

const CreateAcount = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const handleOnSubmit = form.handleSubmit(async (data) => {
    try {
      await createAccount({
        name: data.name,
        email: data.email,
        role: data.role,
        password: data.password,
      });
    } catch (error) {
      console.log(error);
    }
  });

  return (
    <>
      <Form {...form}>
        <form onSubmit={handleOnSubmit}>
          <div className="h-screen  mx-auto max-w-[360px] mt-10">
            <div className="flex flex-col w-full gap-5">
              <div className=" text-center flex flex-col gap-4">
                <h1 className="font-semibold text-3xl capitalize">
                  Criar Conta
                </h1>
                <p className="text-lg">Ainda não tem uma conta? Registre-se.</p>
              </div>
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
                        className="border-zinc-300 border-b-2"
                        placeholder="**********"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <Label className=" uppercase text-lg font-semibold">
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
                  </FormItem>
                )}
              />

              <div className="flex flex-col mt-8">
                <Button
                  type="submit"
                  className=" bg-color-dark text-xl hover:bg-color-darker h-14 rounded-2xl"
                >
                  Criar Conta
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
