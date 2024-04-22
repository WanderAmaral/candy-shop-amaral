import { Menu, ShoppingCart } from "lucide-react";
import MenuSheet from "./menu-sheet";

const Header = () => {
  return (
    <div className="flex justify-between p-4 text-white bg-color-darker border-b border-black items-center">
      <MenuSheet />
      <h1>Amaral Store</h1>
      <ShoppingCart size={30} />
    </div>
  );
};

export default Header;
