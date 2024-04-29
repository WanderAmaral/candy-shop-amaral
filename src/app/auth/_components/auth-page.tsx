import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { FaGoogle } from "react-icons/fa";

const Auth = () => {
  return (
    <div className="h-screen mx-auto max-w-[360px] mt-16">
      <div className="flex flex-col w-full gap-8">
        <div className=" text-center flex flex-col gap-4">
          <h1 className="font-semibold text-3xl capitalize">entrar</h1>
          <p className="text-lg">Entrar na sua conta</p>
        </div>
        <Label className="text-xl font-semibold">Email</Label>
        <Input
          placeholder="hello@reallygreatsite.com"
          className="border-zinc-300 border-b-2"
        />
        <Label className="text-xl font-semibold">Senha</Label>
        <Input type="password" className="border-zinc-300 border-b-2" placeholder="**********"/>
        <Link href={"/register"}>
          <div className="flex justify-end">
            <p className="border-zinc-300 border-b-2 pb-2">
              Ainda não tem uma conta?
            </p>
          </div>
        </Link>
        <div className="flex flex-col gap-11">
          <Button className=" bg-color-dark text-xl hover:bg-color-darker h-14 rounded-2xl">
            Login
          </Button>
          <Button
            variant={"outline"}
            className="gap-2 text-xl uppercase h-14 rounded-2xl"
          >
            <FaGoogle size={20} />
            google
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Auth;
