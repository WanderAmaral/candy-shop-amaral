import { create } from "zustand";
import { CartType } from "./types";



type CartStore = {
  products: CartType[];
  addProductToCart: (product: CartType) => void;
};

export const useCartStore = create<CartStore>((set) => ({
  products: [],
  addProductToCart: (item) =>
    set((state) => {
      return { products: [...state.products, item] };
    }),
}));
