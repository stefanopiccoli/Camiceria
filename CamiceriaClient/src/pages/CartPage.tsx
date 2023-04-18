import { create } from "zustand";
import {Cart, CustomShirt, Shirt} from "../interfaces/interfaces";

interface CartActions {
  addCustomShirt : (customShirt: CustomShirt) => void;
  addShirt: (shirt: Shirt) => void;
}

export const cartStore = create<Cart & CartActions>((set) => ({
  article:[],
  addCustomShirt: (customShirt: CustomShirt) => set((store)=>({article: [...store.article, customShirt]})),
  addShirt: (customShirt: Shirt) => set((store)=>({article: [...store.article, customShirt]}))

}));


export default function CartPage() {


  return <div>Cart</div>;
}
