import { useEffect, useState } from "react";
import { cartStore } from "../store/Cart";
import { userStore } from "../store/User";
import { Link } from "react-router-dom";
import { CustomShirt } from "../interfaces/interfaces";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../auth/firebase";

export default function CartPage() {
  const token = userStore((store) => store.token);

  const articles = cartStore((store) => store.customShirts);

  const removeCustomShirt = cartStore((store) => store.removeCustomShirt);
  const refreshCart = cartStore((store) => store.refreshCustomShirts);
  const [price, setPrice] = useState(0);
  const setUser = userStore((store) => store.setUser);
  const setToken = userStore((store) => store.setToken);
  console.log("oj");

  const handleRemoveFromCart = (itemId?: string) => {
    if (typeof itemId !== "undefined") {
      removeCustomShirt(itemId);
    }
  };

  // useEffect(() => {
  //   onAuthStateChanged(auth, (user) => {
  //     if (user) {
  //       setUser(user);
  //       user.getIdToken().then((token) => {
  //         setToken(token);
  //       });
  //     } else {
  //       setUser(null);
  //       setToken(null);
  //     }
  //   });
  // });

  useEffect(() => {
    token ? refreshCart() : null;
    setPrice(articles.length * 30.0);
  }, [token, articles.length]);

  return (
    <>
      <div className="fixed top-14 h-12 w-full bg-white px-2 border-bottom border-2 flex items-center justify-center">
        <h1 className="text-xl">CARRELLO</h1>
      </div>
      <div className="bg-gray-100">
        {/* ISLOGGED? */}
        {token ? (
          <div className="mt-28">
            {/* CARRELLO VUOTO */}
            {articles.length !== 0 ? (
              <div>
                {articles.map((item, index) => (
                  <div key={index} className="px-1 my-1">
                    <details className=" bg-white p-2 border-2 mx-auto overflow-hidden open:!max-h-[400px]">
                      <summary className="cursor-pointer marker:text-transparent grid grid-cols-4">
                        <img
                          className="h-20"
                          src={item.fabric.imageUrl}
                          alt=""
                        />
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
                <div
                  className="fixed grid grid-flow-col items-center border-t px-4 border-t-neutral-300 bottom-0 w-full h-16 bg-white "
                  id="buttons"
                >
                  <div className="h-3/4 font-bold w-[6rem]">
                    <p>Totale</p>
                    <p>{price.toFixed(2)} &euro;</p>
                  </div>
                  <button className="bg-green-900 text-white h-3/4 w-[6rem] justify-self-end">
                    <Link to="/ordine">Ordina</Link>
                  </button>
                </div>
              </div>
            ) : (
              <div className="h-screen w-full fixed top-0 left-0 bg-gray-100 -z-10 flex flex-col justify-center items-center gap-4">

                <p>Il tuo carrello è vuoto</p>
                <button className="w-1/3 h-8 border bg-slate-900 rounded text-white">
                  <Link to={"/camicie-personalizzate"}>Shop</Link>
                </button>
              </div>
            )}
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
    </>
  );
}
