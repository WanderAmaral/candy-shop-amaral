"use client";
import MenuSheet from "./sheets-header.tsx/menu-sheet";
import CartSheet from "./sheets-header.tsx/cart-sheet";
import { useRouter } from "next/navigation";

const Header = () => {
  const router = useRouter();

  const handleOnClick = () => {
    router.push("/");
  };

  return (
    <div className="flex justify-between p-4 text-white bg-color-darker border-b border-black items-center">
      <MenuSheet />
      <h1
        className="font-semibold text-2xl cursor-pointer"
        onClick={handleOnClick}
      >
        Amaral Store
      </h1>
      <CartSheet />
    </div>
  );
};

export default Header;
