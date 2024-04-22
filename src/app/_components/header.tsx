import { Menu, ShoppingCart } from "lucide-react";
import MenuSheet from "./sheets-header.tsx/menu-sheet";
import CartSheet from "./sheets-header.tsx/cart-sheet";

const Header = () => {
  return (
    <div className="flex justify-between p-4 text-white bg-color-darker border-b border-black items-center">
      <MenuSheet />
      <h1 className="font-semibold text-2xl">Amaral Store</h1>
      <CartSheet />
    </div>
  );
};

export default Header;
