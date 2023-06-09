import { useEffect, useState } from "react";
import { userStore } from "../store/User";
import { Order } from "../interfaces/interfaces";
import { Link } from "react-router-dom";

export default function Profile() {
  const token = userStore((store) => store.token);
  const [orders, setOrders] = useState<Order[]>();

  const getOrders = async () => {
    const api = "/api/users/order/";
    try {
      const response = await fetch(`${import.meta.env.VITE_API_HOST}${api}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: "Bearer " + token,
        },
      });

      let [{ result }] = await response.json();
      setOrders(result);
    } catch (error) {
      console.log(error);
    }
  };

  const renderState = (state: Order["state"]) => {
    switch (state) {
      case "pending":
        return (
          <p>
            <i
              className="fa fa-circle text-sm text-yellow-400"
              aria-hidden="true"
            ></i>{" "}
            In lavorazione
          </p>
        );
      case "shipped":
        return (
          <p>
            <i
              className="fa fa-circle text-sm text-blue-400"
              aria-hidden="true"
            ></i>{" "}
            Spedito
          </p>
        );
      case "canceled":
        return (
          <p>
            <i
              className="fa fa-circle text-sm text-red-600"
              aria-hidden="true"
            ></i>{" "}
            Cancellato
          </p>
        );
      case "delivered":
        return (
          <p>
            <i
              className="fa fa-circle text-sm text-green-700"
              aria-hidden="true"
            ></i>{" "}
            Consegnato
          </p>
        );
    }
  };

  useEffect(() => {
    token ? getOrders() : setOrders([]);
  }, [token]);

  return (
    <div className="pt-20 p-4">
      <div className="xsm:container mx-auto">
        <h1 className="text-2xl">I miei ordini</h1>
        {token ? (
          <div>
            {orders?.map((item, index) => (
              <div key={item._id} className="border bg-zinc-400 w-full my-4">
                <details className="bg-white p-2 border-2 mx-auto overflow-hidden open:!max-h-[400px]">
                  <summary className="cursor-pointer marker:text-transparent grid grid-cols-4">
                    <div className="col-span-2">{renderState(item.state)}</div>
                    <p>
                      {item.articles.customShirts.length}{" "}
                      {item.articles.customShirts.length === 1
                        ? "articolo"
                        : "articoli"}
                    </p>
                    <p>{item.price.toFixed(2)} &euro;</p>
                  </summary>

                  <hr className="my-2 scale-x-150" />

                  <div className="text -m-4 -mt-2 p-4 bg-gray-50">
                    <div className="grid grid-cols-2">
                      <div>
                        <p className="text-sm italic">Data ordine:</p>
                        <p>{new Date(item.date).toLocaleDateString()}</p>
                        <p>{new Date(item.date).toLocaleTimeString()}</p>
                      </div>
                      <div>
                        <p className="text-sm italic">Spedizione:</p>
                        <p>{item.shipment.name}</p>
                        <p>{item.shipment.address}</p>
                        <p>
                          {item.shipment.city}({item.shipment.province})
                        </p>
                        <p>{item.shipment.cap}</p>
                      </div>
                      <div className="col-span-2 p-1">
                        <p className="text-sm italic">Articoli:</p>
                        <div className="h-44 overflow-y-scroll border-2 lg:grid lg:grid-cols-2">
                          {item.articles.customShirts.map((item, index) => (
                            <div
                              key={item._id}
                              className="grid border-b-2 grid-cols-12 gap-x-2 p-2 lg:border-l-2"
                            >
                              <p className="w-3">{index + 1}</p>
                              <img
                                className="w-32 col-span-5"
                                src={item.fabric.imageUrl}
                              />
                              <div className="col-span-6">
                                <p>{item.collar.name}</p>
                                <p>{item.fabric.name}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </details>
              </div>
            ))}
            {orders?.length===0 ? <p>Non hai ancora effettuato nessun ordine. Vai allo <Link className="underline text-blue-800" to="/camicie-personalizzate">shop</Link>.</p> : null }
          </div>
        ) : (
          <div className="flex fixed h-screen w-full left-0 right-0 top-0 bottom-0 items-center justify-center">
            <p>
              {" "}
              <Link
                to="/accedi"
                className="underline underline-offset-1 text-slate-900"
              >
                Accedi
              </Link>{" "}
              per visualizzare i tuoi ordini
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
