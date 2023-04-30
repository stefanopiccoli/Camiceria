import { useEffect, useState } from "react";
import { cartStore } from "../store/Cart";
import { userStore } from "../store/User";
import { Link } from "react-router-dom";
import { CustomShirt } from "../interfaces/interfaces";

export default function CartPage() {
  const articles = cartStore((store) => store.customShirts);

  const removeCustomShirt = cartStore((store) => store.removeCustomShirt);
  const refreshCart = cartStore((store) => store.refreshCustomShirts);
  const user = userStore((store) => store.user);
  const userId = userStore((store) => store.user?.uid);
  const [price, setPrice] = useState(0);
  console.log("oj");

  const handleRemoveFromCart = (_id?: string) => {
    if (typeof _id !== "undefined" && userId) {
      removeCustomShirt(_id, userId);
    }
  };

  useEffect(() => {
    userId ? refreshCart(userId) : null;
    setPrice((articles.length * 30.00));
  }, [user, articles.length]);

  return (
    <>
      <div className="fixed top-14 h-12 w-full bg-white px-2 border-bottom border-2 flex items-center justify-center">
        <h1 className="text-xl">CARRELLO</h1>
      </div>
      <div className="bg-gray-100">
        {user ? (
          <div className="mt-28">
            {articles.map((item, index) => (
              <div key={index} className="px-1 my-1">
                <details className=" bg-white p-2 border-2 mx-auto overflow-hidden open:!max-h-[400px]">
                  <summary className="cursor-pointer marker:text-transparent grid grid-cols-4">
                    <img className="h-20" src={item.fabric.imageUrl} alt="" />
                    <div className="text-lg col-span-2">
                      <ul>
                        <li>{item.collar.name}</li>
                        <li>{item.fabric.name}</li>
                        <li>{item.cuff.name}</li>
                      </ul>
                    </div>
                    <div className="flex flex-col justify-self-end self-center ">
                      <i
                        className="fa fa-times text-3xl text-red-900"
                        onClick={() => handleRemoveFromCart(item._id)}
                      ></i>
                    </div>
                  </summary>

                  <hr className="my-2 scale-x-150" />

                  <div className="text -m-4 -mt-2 p-4 bg-gray-50">
                    <div className="grid grid-cols-2 ">
                      <div>
                        <p>Ricamo:</p>
                        {item.sign.do ? (
                          <div>
                            <p className="italic">
                              {item.sign.text}{" "}
                              {item.sign.font === "capitalized"
                                ? "(Maiuscolo)"
                                : "(Corsivo)"}
                            </p>
                          </div>
                        ) : (
                          <p className="italic">Nessuno</p>
                        )}
                      </div>
                      <div>
                        <p>Collo {item.measure.neck}cm</p>
                        <p>Spalle {item.measure.shoulder}cm</p>
                        <p>Torace {item.measure.chest}cm</p>
                        <p>Vita {item.measure.hips}cm</p>
                        <p>Maniche {item.measure.sleeve}cm</p>
                      </div>
                    </div>
                  </div>
                </details>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex h-screen items-center justify-center">
            <p>
              {" "}
              <Link
                to="/accedi"
                className="underline underline-offset-1 text-slate-900"
              >
                Accedi
              </Link>{" "}
              per visualizzare il tuo carrello
            </p>
          </div>
        )}
      </div>
      <div
        className="fixed grid grid-flow-col items-center border-t px-4 border-t-neutral-300 bottom-0 w-full h-16 bg-white "
        id="buttons"
      >
        <div className="h-3/4 font-bold w-[6rem]">
          <p>Totale</p>
          <p>{price} &euro;</p>
        </div>

        <button className="bg-green-900 text-white h-3/4 w-[6rem] justify-self-end">
          Ordina
        </button>
      </div>
    </>
  );
}
