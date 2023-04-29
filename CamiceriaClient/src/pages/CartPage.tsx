import { useEffect } from "react";
import { cartStore } from "../store/Cart";
import { userStore } from "../store/User";
import { Link } from "react-router-dom";

export default function CartPage() {
  const articles = cartStore((store) => store.customShirts);
  const remove = cartStore((store) => store.removeCustomShirt);
  const refreshCart = cartStore((store) => store.refreshCustomShirts);
  const user = userStore((store) => store.user);
  const userId = userStore((store) => store.user?.uid);

  useEffect(() => {
    userId ? refreshCart(userId) : null;
  }, [articles, user]);

  return (
    <>
      <div className="fixed top-14 h-12 w-full bg-white px-2 border-bottom border-2 flex items-center justify-center">
        <h1 className="text-xl">CARRELLO</h1>
      </div>
      <div className="bg-gray-100">
        {user ? (
          <div className="mt-28">
            {articles.map((item, index) => (
              // <div key={index} className="border pt-1 mb-4">
              //   <p>{item.collar.name}</p>
              //   <p>{item.fabric.name}</p>
              //   <p>{item.cuff.name}</p>
              //   <p>
              //     {item.sign.do && item.sign.text}(
              //     {item.sign.do && item.sign.font})
              //   </p>
              //   <p>
              //     {item.measure.chest}
              //     {item.measure.hips}
              //     {item.measure.neck}
              //     {item.measure.shoulder}
              //     {item.measure.sleeve}
              //   </p>
              //   <button
              //     onClick={() =>
              //       typeof item._id !== "undefined" && userId
              //         ? remove(item._id, userId)
              //         : null
              //     }
              //   >
              //     Rimuovi
              //   </button>
              // </div>
              <div key={index} className="px-1 my-1">
                <details className=" bg-white p-2 border-2 mx-auto overflow-hidden open:!max-h-[400px]">
                  <summary className="cursor-pointer marker:text-transparent flex justify-between gap-4">
                    <img className="h-20" src={item.collar.imageUrl} alt="" />
                    <div className="text-lg">
                      <ul>
                        <li>{item.collar.name}</li>
                        <li>{item.fabric.name}</li>
                        <li>{item.cuff.name}</li>
                      </ul>
                    </div>
                    <div className="flex flex-col justify-center ">
                      <i
                        className="fa fa-times text-3xl text-red-900"
                        onClick={() =>
                          typeof item._id !== "undefined" && userId
                            ? remove(item._id, userId)
                            : null
                        }
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
    </>
  );
}
