import { useEffect, useState } from "react";
import { userStore } from "../store/User";
import { Order } from "../interfaces/interfaces";

export default function Profile() {
  const token = userStore((store) => store.token);
  const setToken = userStore((store) => store.setToken);
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

      let { orders } = await response.json();
      console.log(orders);
      setOrders(orders);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    token ? getOrders() : null;
  }, [token]);

  return (
    <div className="pt-28 p-4">
      Profile
      {orders?.map((item, index) => (
        <div key={item._id} className="border bg-zinc-400 w-full">
          <div className="grid grid-flow-col">
            <p className="col-span-2">{new Date(item.date).toLocaleString()}</p>
            <p>{item.articles.customShirts.length}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
