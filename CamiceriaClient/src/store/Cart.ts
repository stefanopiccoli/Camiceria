import { create } from "zustand";
import { Cart, CustomShirt } from "../interfaces/interfaces";
import { mountStoreDevtool } from "simple-zustand-devtools";
import { userStore } from "./User";

export interface CartActions {
  refreshCustomShirts: () => void;
  addCustomShirt: (customShirt: CustomShirt) => void;
  removeCustomShirt: (itemId: string) => void;
  clearCart: () => void;
}

export const cartStore = create<Cart & CartActions>((set, get) => ({
  loading: true,
  customShirts: [], //Contiene tutte le camicie personalizzate del carrello
  refreshCustomShirts: async () => {
    //Aggiorna il carrello allo stato del database
    try {
      const api = "/api/users/cart/customShirts";
      const token = userStore.getState().token;

      const response = await fetch(`${import.meta.env.VITE_API_HOST}${api}/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: "Bearer " + token,
        },
      });

      let result = await response.json();
      const { cart } = result;
      console.log(result);
      if (cart) set(() => ({ customShirts: cart.customShirts }));
      else set(() => ({ customShirts: [] }));
    } catch (error) {
      console.log(error);
    }
  },

  addCustomShirt: async (customShirt: CustomShirt) => {
    const token = userStore.getState().token;
    //Aggiunge nel carrello di userId una camicia personalizzata
    try {
      const api = "/api/users/addToCart";
      const response = await fetch(`${import.meta.env.VITE_API_HOST}${api}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          authorization: "Bearer " + token,
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
      get().refreshCustomShirts();
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  },
  removeCustomShirt: async (itemId: string) => {
    try {
      const token = userStore.getState().token;
      const api = "/api/users/cart/remove/" + itemId;
      const response = await fetch(`${import.meta.env.VITE_API_HOST}${api}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          authorization: "Bearer " + token,
        },
      });
      console.log(response);
      get().refreshCustomShirts();
    } catch (error) {
      console.log(error);
    }
  },
  clearCart: async () => {
    try {
      const token = userStore.getState().token;
      const api = "/api/users/cart/removeAll/";
      const response = await fetch(`${import.meta.env.VITE_API_HOST}${api}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          authorization: "Bearer " + token,
        },
      });
      console.log(response);
      get().refreshCustomShirts();
    } catch (error) {
      console.log(error);
    }
  },
}));

mountStoreDevtool("cartStore", cartStore);
