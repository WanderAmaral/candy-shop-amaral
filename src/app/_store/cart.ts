import { create } from "zustand";
import { CartType } from "../_types/cart-type";

type CartStore = {
  products: CartType[];
  addProductToCart: (product: CartType) => void;
  removeProductToCart: (productId: string) => void;
  increaseCartProductQuantity: (productId: string) => void;
  decreaseCartProductQuantity: (productId: string) => void;
  clearCartProducts: () => void;
};

export const useCartStore = create<CartStore>((set) => ({
  products: [],

  // Adiciona um produto ao carrinho
  addProductToCart: (newProduct) =>
    set((state) => {
      const productIndex = state.products.findIndex(
        (item) => item.id === newProduct.id
      );

      if (productIndex !== -1) {
        const updatedProducts = state.products.map((item, index) =>
          index === productIndex
            ? { ...item, quantity: (item.quantity || 0) + 1 }
            : item
        );

        return { products: updatedProducts };
      }

      return { products: [...state.products, { ...newProduct, quantity: 1 }] };
    }),

  // Remove um produto do carrinho
  removeProductToCart: (productId) =>
    set((state) => {
      const updatedProducts = state.products.filter(
        (item) => item.id !== productId
      );
      return { products: updatedProducts };
    }),

  // Aumenta a quantidade de um produto no carrinho
  increaseCartProductQuantity: (productId) =>
    set((state) => {
      const updatedProducts = state.products.map((product) =>
        product.id === productId
          ? { ...product, quantity: (product.quantity || 0) + 1 }
          : product
      );
      return { products: updatedProducts };
    }),

  // Diminui a quantidade de um produto no carrinho
  decreaseCartProductQuantity: (productId) =>
    set((state) => {
      const updatedProducts = state.products
        .map((product) =>
          product.id === productId
            ? { ...product, quantity: (product.quantity || 0) - 1 }
            : product
        )
        .filter((product) => (product.quantity || 0) > 0); // Remove o produto se a quantidade for 0
      return { products: updatedProducts };
    }),

  // Limpa todos os produtos do carrinho
  clearCartProducts: () =>
    set(() => ({
      products: [],
    })),
}));
