import { useEffect } from "react";
import { cartStore } from "../store/Cart";
import { userStore } from "../store/User";

export default function CartPage() {
  const articles = cartStore((store) => store.customShirts);
  const remove = cartStore((store) => store.removeCustomShirt);
  const refreshCart = cartStore((store) => store.refreshCustomShirts);
  const userId = userStore((store) => store.user?.uid);

  useEffect(() => {
    userId? refreshCart(userId): null;
  }, [articles]);

  return (
    <>
      <div className="h-14"></div>
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
                typeof item._id !== "undefined" && userId ? remove(item._id, userId) : null
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
