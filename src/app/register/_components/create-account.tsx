import { Button } from "@/components/ui/button";
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

const CreateAcount = () => {
  return (
    <>
      <div className="h-screen  mx-auto max-w-[360px] mt-10">
        <div className="flex flex-col w-full gap-5">
          <div className=" text-center flex flex-col gap-4">
            <h1 className="font-semibold text-3xl capitalize">Criar Conta</h1>
            <p className="text-lg">Ainda não tem uma conta? Registre-se.</p>
          </div>
          <Label className="text-xl font-semibold">Nome</Label>
          <Input
            placeholder="Jhon Doe"
            className="border-zinc-300 border-b-2"
          />
          <Label className="text-xl font-semibold">Email</Label>
          <Input
            placeholder="hello@reallygreatsite.com"
            className="border-zinc-300 border-b-2"
          />
          <Label className="text-xl font-semibold">Senha</Label>
          <Input
            type="password"
            className="border-zinc-300 border-b-2"
            placeholder="**********"
          />
          <Label className=" uppercase text-lg font-semibold">
            Empresa/Cliente
          </Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Empresa/Cliente" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="company">Empresa</SelectItem>
                <SelectItem value="client">Cliente</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>

          <div className="flex flex-col mt-8">
            <Button className=" bg-color-dark text-xl hover:bg-color-darker h-14 rounded-2xl">
              Criar Conta
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateAcount;
