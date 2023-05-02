import { useEffect, useState } from "react";
import { cartStore } from "../store/Cart";
import { userStore } from "../store/User";
import { User, onAuthStateChanged } from "firebase/auth";
import { auth } from "../auth/firebase";
import Loading from "../components/Loading";

export default function OrderForm() {
  const articles = cartStore((store) => store.customShirts);
  const refreshCart = cartStore((store) => store.refreshCustomShirts);
  const token = userStore((store) => store.token);
  const setToken = userStore((store) => store.setToken);

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [province, setProvince] = useState("");
  const [cap, setCap] = useState("");
  const [price, setPrice] = useState(articles.length);

  const handleAddToOrders = async (e : React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const api = "/api/users/order/create";
    try {
      const response = await fetch(`${import.meta.env.VITE_API_HOST}${api}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: "Bearer " + token,
        },
        body: JSON.stringify({ articles: articles }),
      });

      let result = await response.json();
      console.log(result);
      console.log(articles);
      
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        user.getIdToken().then((token) => {
          setToken(token);
        });
      } else {
        setToken(null);
      }
    });
  });

  useEffect(() => {
    token ? refreshCart() : null;
  }, [token]);

  useEffect(() => {
    setPrice(articles.length);
  }, [articles, token]);

  return (
    <>
      <div className="pt-20 p-4">
        {token ? (
          <>
            <h1 className="text-center text-2xl">Spedizione</h1>
            <form className="mt-10" onSubmit={(e) => handleAddToOrders(e)}>
              <p>Nome</p>
              <input
                className="w-full"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <p className="mt-2">Indirizzo</p>
              <input
                className="w-full"
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
              <div className="grid grid-rows-2 grid-cols-4 grid-flow-col gap-x-2 py-2">
                <p className="col-span-3">Città</p>
                <input
                  className="col-span-3"
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
                <p>Provincia</p>
                <input
                  className="text-center"
                  maxLength={2}
                  type="text"
                  value={province}
                  onChange={(e) => setProvince(e.target.value)}
                />
              </div>
              <p>CAP</p>
              <input
                className="w-1/5 text-center block"
                maxLength={5}
                type="text"
                value={cap}
                onChange={(e) => setCap(e.target.value)}
              />
              <div className="flex flex-col items-end font-bold mt-14 px-4">
                <p className="text-2xl">Totale</p>
                <p>{price.toFixed(2)} &euro;</p>
              </div>
              <div className="flex items-center justify-center">
                <button
                  type="submit"
                  className="bg-green-900 text-white h-12 w-32 mt-14"
                >
                  Ordina e paga
                </button>
              </div>
            </form>
          </>
        ) : (
          <Loading />
        )}
      </div>
    </>
  );
}
