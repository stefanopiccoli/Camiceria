import { create } from "zustand";
import { Cart, CustomShirt, Shirt, CartActions } from "../interfaces/interfaces";
import { selectionStore } from "./ShirtConfiguration";
import { mountStoreDevtool } from "simple-zustand-devtools";

/// STORE ///

export const cartStore = create<Cart & CartActions>((set) => ({
  loading: true,
  customShirts: [], //Contiene tutte le camicie personalizzate del carrello
  refreshCustomShirts: async () => { //Aggiorna il carrello allo stato del database
    try {
      const api = "/api/v2/cart/customShirt";
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

  addCustomShirt: async (customShirt: CustomShirt) => { //Aggiunge nel database una camicia personalizzata
    try {
      const api = "/api/v2/addCustomShirtToCart";
      const response = await fetch(`${import.meta.env.VITE_API_HOST}${api}`, {
        method: "POST",
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
}));

mountStoreDevtool("cartStore", cartStore);

/// FINE STORE ///

export default function CartPage() {
  const articles = cartStore((store) => store.customShirts);
  const a = [1, 2, 3];
  console.log("art:");
  console.log(articles);
  console.log(a);

  return (
    <>
      <div>
        {articles.map((item, index) => (
          <div key={index} className="border mb-4">
            <p>{item.collar.name}</p>
            <p>{item.fabric.name}</p>
            <p>{item.cuff.name}</p>
            <p>
              {item.sign.text}({item.sign.font})
            </p>
            <p>
              {item.measure.chest}
              {item.measure.hips}
              {item.measure.neck}
              {item.measure.shoulder}
              {item.measure.sleeve}
            </p>
            <button>Rimuovi</button>
          </div>
        ))}
      </div>
    </>
  );
}
