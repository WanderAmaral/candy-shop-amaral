import { create } from "zustand";

type CartType = {
    id: string,
    name: string,
    price: number,
    imageUrl: string,

}

type CartStore = {
    products: CartType[],
    addProductToCart: (product: CartType) => void
}

export const useCartStore = create(() => {
    
})