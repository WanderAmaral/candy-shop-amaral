"use client";
import MenuSheet from "./sheets-header.tsx/menu-sheet";
import CartSheet from "./sheets-header.tsx/cart-sheet";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

const Header = () => {
  const router = useRouter();

  const handleOnClick = () => {
    router.push("/");
  };

  return (
    <div className="w-full flex  relative justify-between p-4 text-white  bg-color-darker border-b border-black items-center">
      <MenuSheet />
      <Button
      variant={'ghost'}
        className="font-semibold text-2xl cursor-pointer text-wrap"
        onClick={handleOnClick}
      >
        Amaral Store
      </Button>
      <CartSheet />
    </div>
  );
};

export default Header;
