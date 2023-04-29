import { create } from "zustand";
import {
  Cart,
  CustomShirt,
  Shirt,
  CartActions,
} from "../interfaces/interfaces";
import { mountStoreDevtool } from "simple-zustand-devtools";

export const cartStore = create<Cart & CartActions>((set) => ({
  loading: true,
  customShirts: [], //Contiene tutte le camicie personalizzate del carrello
  refreshCustomShirts: async (userId : string) => {
    //Aggiorna il carrello allo stato del database
    try {
      const api = "/api/users/cart/customShirts";
      const response = await fetch(
        `${import.meta.env.VITE_API_HOST}${api}/`+userId,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      let result = await response.json();
      const { cart } = result;
      set(() => ({ customShirts: cart.customShirts }));
    } catch (error) {
      console.log(error);
    }
  },

  addCustomShirt: async (customShirt: CustomShirt, userId : string) => {
    console.log('abfik');
    
    //Aggiunge nel carrello di userId una camicia personalizzata
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
          userId: userId,
        }),
      });

      let result = await response.json();
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  },
  removeCustomShirt: async (id: string, userId : string) => {
    try {
      const api = "/api/users/cart/remove/" + id;
      const response = await fetch(`${import.meta.env.VITE_API_HOST}${api}`, {
        method: "PATCH",
        body:JSON.stringify({userId: userId}),
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
