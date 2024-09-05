import { create } from "zustand";
import { CartType } from "../_types/cart-type";

type CartStore = {
  products: CartType[];
  addProductToCart: (product: CartType) => void;
};

export const useCartStore = create<CartStore>((set) => ({
  products: [],
  addProductToCart: (item) =>
    set((state) => {
      return { products: [...state.products, { ...item, quantity: 1 }] };
    }),
}));
