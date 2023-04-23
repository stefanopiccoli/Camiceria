import { create } from "zustand";
import {
  Cart,
  CustomShirt,
  Shirt,
  CartActions,
} from "../interfaces/interfaces";
import { selectionStore } from "./ShirtConfiguration";
import { mountStoreDevtool } from "simple-zustand-devtools";
import { log } from "console";
import { useEffect } from "react";

/// STORE ///

export const cartStore = create<Cart & CartActions>((set) => ({
  loading: true,
  customShirts: [], //Contiene tutte le camicie personalizzate del carrello
  refreshCustomShirts: async () => {
    //Aggiorna il carrello allo stato del database
    try {
      const api = "/api/users/cart/customShirts";
      const response = await fetch(`${import.meta.env.VITE_API_HOST}${api}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      let result = await response.json();
      const { cart } = result;
      set(() => ({ customShirts: cart.customShirts }));
    } catch (error) {
      console.log(error);
    }
  },

  addCustomShirt: async (customShirt: CustomShirt) => {
    //Aggiunge nel database una camicia personalizzata
    try {
      const api = "/api/users/addToCart";
      const response = await fetch(`${import.meta.env.VITE_API_HOST}${api}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          collar: customShirt.collar,
          fabric: customShirt.fabric,
          cuff: customShirt.cuff,
          measure: customShirt.measure,
          sign: customShirt.sign,
        }),
      });

      let result = await response.json();
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  },
  removeCustomShirt: async (id: string) => {
    try {
      const api = "/api/users/cart/remove/" + id;
      const response = await fetch(`${import.meta.env.VITE_API_HOST}${api}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  },
}));

mountStoreDevtool("cartStore", cartStore);

/// FINE STORE ///

export default function CartPage() {
  const articles = cartStore((store) => store.customShirts);
  const remove = cartStore((store) => store.removeCustomShirt);
  const refreshCart = cartStore((store) => store.refreshCustomShirts);

  useEffect(() => {
    refreshCart();
  }, [articles]);

  return (
    <>
      <div className="h-11=2"></div>
      <div className="fixed top-14 h-12 w-full bg-white px-2 border-bottom border-2 flex items-center justify-center">
        <h1 className="text-xl">CARRELLO</h1>
      </div>
      <div>
        {articles.map((item, index) => (
          <div key={index} className="border mb-4">
            <p>{item.collar.name}</p>
            <p>{item.fabric.name}</p>
            <p>{item.cuff.name}</p>
            <p>
              {item.sign.do && item.sign.text}({item.sign.do && item.sign.font})
            </p>
            <p>
              {item.measure.chest}
              {item.measure.hips}
              {item.measure.neck}
              {item.measure.shoulder}
              {item.measure.sleeve}
            </p>
            <button
              onClick={() =>
                typeof item._id !== "undefined" ? remove(item._id) : null
              }
            >
              Rimuovi
            </button>
          </div>
        ))}
      </div>
    </>
  );
}
