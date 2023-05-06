import colletto from "../assets/images/collar.webp";
import tessuto from "../assets/images/fabric.webp";
import polsino from "../assets/images/cuff.webp";
import ordine from "../assets/images/order.webp";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  Collar,
  Cuff,
  Fabric,
  Order,
  User,
  UserMDB,
} from "../interfaces/interfaces";
import Loading from "../components/Loading";
import { userStore } from "../store/User";
import Modal from "../components/Modal";

export default function ManageArticles() {
  const location = useLocation();
  return (
    <>
      <h1 className="mt-16 text-center text-3xl">Gestione</h1>
      <div className="grid grid-cols-2 gap-4 p-4 sm:grid-cols-3 xsm:container xsm:mx-auto xsm:max-w-lg">
        <Link to="colletti">
          <div className="border-2">
            <img src={colletto} alt="" />
            <p className="text-center">Colletti</p>
          </div>
        </Link>
        <Link to="tessuti">
          <div className="border-2">
            <img src={tessuto} alt="" />
            <p className="text-center">Tessuti</p>
          </div>
        </Link>
        <Link to="polsini">
          <div className="border-2">
            <img src={polsino} alt="" />
            <p className="text-center">Polsini</p>
          </div>
        </Link>
        <Link to="ordini" className="h-full">
          <div className="border-2 h-full">
            <img src={ordine} alt="" />
            <p className="text-center">Ordini</p>
          </div>
        </Link>
      </div>
    </>
  );
}

export function ManageCollars() {
  const token = userStore((store) => store.token);
  const admin = userStore((store) => store.admin);
  useEffect(() => {
    {
      admin && token
        ? getData("/api/collars/get", setCollars)
        : setShowModal(true);
    }
  }, [token, admin]);

  // MODAL
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const handleModal = (show: boolean) => {
    setShowModal(show);
    navigate("/");
  };

  const [loading, setLoading] = useState(true);
  const [collars, setCollars] = useState<Collar[]>([]);
  const [name, setName] = useState("");
  const [buttons, setButtons] = useState("1");
  const [file, setFile] = useState<any>();

  const [update, setUpdate] = useState<Partial<Collar>>({});

  const getData = async (
    api: string,
    setter: React.Dispatch<React.SetStateAction<Collar[]>>
  ) => {
    setLoading(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_API_HOST}${api}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: "Bearer " + token,
        },
      });

      let result = await response.json();
      setter(result);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  useEffect(() => {
    getData("/api/collars/get", setCollars);
  }, []);

  const handleCreate = async () => {
    const api = "/api/collars/create";
    const formData = new FormData();
    formData.append("name", name);
    formData.append("buttons", buttons);
    formData.append("file", file);
    try {
      const response = await fetch(`${import.meta.env.VITE_API_HOST}${api}`, {
        method: "POST",
        body: formData,
        headers: {
          authorization: "Bearer " + token,
        },
      });

      let result = await response.json();
      console.log(result);
      getData("/api/collars/get", setCollars);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = async () => {
    const api = "/api/collars/update/" + update._id;
    try {
      const response = await fetch(`${import.meta.env.VITE_API_HOST}${api}`, {
        method: "PATCH",
        body: JSON.stringify(update),
        headers: {
          "Content-Type": "application/json",
          authorization: "Bearer " + token,
        },
      });

      let result = await response.json();
      getData("/api/collars/get", setCollars);
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id: string) => {
    const api = "/api/collars/delete/" + id;
    try {
      const response = await fetch(`${import.meta.env.VITE_API_HOST}${api}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          authorization: "Bearer " + token,
        },
      });
      let result = await response.json();
      getData("/api/collars/get", setCollars);
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };
  return admin ? (
    <>
      <div className="fixed top-14 h-12 w-full bg-white px-2 border-bottom border-2 flex items-center justify-center">
        <h1 className="text-xl">Colletti</h1>
      </div>
      <div className="pt-28 p-3">
        <form className="flex flex-col gap-y-4">
          <div>
            <label className="text-xl">Nome:</label>
            <input
              className="w-full h-10 px-5 border-2"
              type="text"
              placeholder="Inserisci il nome..."
              name="name"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="flex justify-between">
            <p className="text-xl">Bottoni:</p>

            <select
              className="border-2 rounded-md w-2/3 "
              name="buttons"
              id=""
              onChange={(e) => setButtons(e.target.value)}
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </div>
          <div className="flex">
            <p className="text-xl w-1/3">Foto:</p>

            <input
              type="file"
              name="file"
              onChange={(e) =>
                e.target.files ? setFile(e.target.files[0]) : null
              }
            />
          </div>

          <button
            type="button"
            className="bg-slate-900 text-white h-8 w-1/3 self-end"
            onClick={(e) => handleCreate()}
          >
            Aggiungi
          </button>
          <hr />
        </form>
        <div className="grid grid-cols-1 gap-2 mt-2">
          {loading ? (
            <Loading />
          ) : (
            collars.map((item, index) => (
              <div key={item._id} className="flex w-full border-2 gap-2">
                <div className="flex flex-col items-center">
                  <img src={item.imageUrl} className="w-28" alt="" />
                  <i
                    className="fa fa-trash text-2xl text-red-800"
                    aria-hidden="true"
                    onClick={() => handleDelete(item._id)}
                  ></i>
                </div>
                <div className="flex flex-col justify-evenly">
                  <input
                    type="text"
                    name="name"
                    defaultValue={item.name}
                    onChange={(e) =>
                      setUpdate((update) => ({
                        ...update,
                        _id: item._id,
                        name: e.target.value,
                      }))
                    }
                  />
                  <input
                    type="number"
                    name="buttons"
                    className="w-10 px-2"
                    defaultValue={item.buttons}
                    onChange={(e) =>
                      setUpdate((update) => ({
                        ...update,
                        _id: item._id,
                        buttons: Number(e.target.value),
                      }))
                    }
                  />
                  <button
                    type="button"
                    className="bg-slate-900 text-white h-8 w-2/5 self-end"
                    onClick={() => handleUpdate()}
                  >
                    Aggiorna
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  ) : (
    <Modal show={showModal} handleModal={handleModal} title={"Accesso negato"}>
      Non hai i permessi per accedere a questa sezione
    </Modal>
  );
}

export function ManageFabrics() {
  const token = userStore((store) => store.token);
  const admin = userStore((store) => store.admin);
  useEffect(() => {
    {
      admin && token
        ? getData("/api/fabrics/get", setFabrics)
        : setShowModal(true);
    }
  }, [token, admin]);

  // MODAL
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const handleModal = (show: boolean) => {
    setShowModal(show);
    navigate("/");
  };

  const [loading, setLoading] = useState(true);
  const [fabrics, setFabrics] = useState<Fabric[]>([]);
  const [name, setName] = useState("");
  const [file, setFile] = useState<any>();

  const [update, setUpdate] = useState<Partial<Fabric>>({});

  const getData = async (
    api: string,
    setter: React.Dispatch<React.SetStateAction<Fabric[]>>
  ) => {
    setLoading(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_API_HOST}${api}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: "Bearer " + token,
        },
      });

      let result = await response.json();
      setter(result);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  useEffect(() => {
    getData("/api/fabrics/get", setFabrics);
  }, []);

  const handleCreate = async () => {
    const api = "/api/fabrics/create";
    const formData = new FormData();
    formData.append("name", name);
    formData.append("file", file);
    try {
      const response = await fetch(`${import.meta.env.VITE_API_HOST}${api}`, {
        method: "POST",
        headers: {
          authorization: "Bearer " + token,
        },
        body: formData,
      });

      let result = await response.json();
      console.log(result);
      getData("/api/fabrics/get", setFabrics);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = async () => {
    const api = "/api/fabrics/update/" + update._id;
    try {
      const response = await fetch(`${import.meta.env.VITE_API_HOST}${api}`, {
        method: "PATCH",
        body: JSON.stringify(update),
        headers: {
          "Content-Type": "application/json",
          authorization: "Bearer " + token,
        },
      });

      let result = await response.json();
      getData("/api/fabrics/get", setFabrics);
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id: string) => {
    const api = "/api/fabrics/delete/" + id;
    try {
      const response = await fetch(`${import.meta.env.VITE_API_HOST}${api}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          authorization: "Bearer " + token,
        },
      });
      let result = await response.json();
      getData("/api/fabrics/get", setFabrics);
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };
  return admin ? (
    <>
      <div className="fixed top-14 h-12 w-full bg-white px-2 border-bottom border-2 flex items-center justify-center">
        <h1 className="text-xl">Tessuti</h1>
      </div>
      <div className="pt-28 p-3">
        <form className="flex flex-col gap-y-4">
          <div>
            <label className="text-xl">Nome:</label>
            <input
              className="w-full h-10 px-5 border-2"
              type="text"
              placeholder="Inserisci il nome..."
              name="name"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="flex">
            <p className="text-xl w-1/3">Foto:</p>

            <input
              type="file"
              name="file"
              onChange={(e) =>
                e.target.files ? setFile(e.target.files[0]) : null
              }
            />
          </div>

          <button
            type="button"
            className="bg-slate-900 text-white h-8 w-1/3 self-end"
            onClick={(e) => handleCreate()}
          >
            Aggiungi
          </button>
          <hr />
        </form>
        <div className="grid grid-cols-1 gap-2 mt-2">
          {loading ? (
            <Loading />
          ) : (
            fabrics.map((item, index) => (
              <div key={item._id} className="flex w-full border-2 gap-2">
                <div className="flex flex-col items-center">
                  <img src={item.imageUrl} className="w-28" alt="" />
                  <i
                    className="fa fa-trash text-2xl text-red-800"
                    aria-hidden="true"
                    onClick={() => handleDelete(item._id)}
                  ></i>
                </div>
                <div className="flex flex-col justify-evenly">
                  <input
                    type="text"
                    name="name"
                    defaultValue={item.name}
                    onChange={(e) =>
                      setUpdate((update) => ({
                        ...update,
                        _id: item._id,
                        name: e.target.value,
                      }))
                    }
                  />
                  <button
                    type="button"
                    className="bg-slate-900 text-white h-8 w-2/5 self-end"
                    onClick={() => handleUpdate()}
                  >
                    Aggiorna
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  ) : (
    <Modal show={showModal} handleModal={handleModal} title={"Accesso negato"}>
      Non hai i permessi per accedere a questa sezione
    </Modal>
  );
}

export function ManageCuffs() {
  const token = userStore((store) => store.token);
  const admin = userStore((store) => store.admin);
  useEffect(() => {
    {
      admin && token ? getData("/api/cuffs/get", setCuffs) : setShowModal(true);
    }
  }, [token, admin]);

  // MODAL
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const handleModal = (show: boolean) => {
    setShowModal(show);
    navigate("/");
  };

  const [loading, setLoading] = useState(true);
  const [cuffs, setCuffs] = useState<Cuff[]>([]);
  const [name, setName] = useState("");
  const [file, setFile] = useState<any>();

  const [update, setUpdate] = useState<Partial<Cuff>>({});

  const getData = async (
    api: string,
    setter: React.Dispatch<React.SetStateAction<Cuff[]>>
  ) => {
    setLoading(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_API_HOST}${api}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: "Bearer " + token,
        },
      });

      let result = await response.json();
      setter(result);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const handleCreate = async () => {
    const api = "/api/cuffs/create";
    const formData = new FormData();
    formData.append("name", name);
    formData.append("file", file);
    try {
      const response = await fetch(`${import.meta.env.VITE_API_HOST}${api}`, {
        method: "POST",
        headers: {
          authorization: "Bearer " + token,
        },
        body: formData,
      });

      let result = await response.json();
      console.log(result);
      getData("/api/cuffs/get", setCuffs);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = async () => {
    const api = "/api/cuffs/update/" + update._id;
    try {
      const response = await fetch(`${import.meta.env.VITE_API_HOST}${api}`, {
        method: "PATCH",
        body: JSON.stringify(update),
        headers: {
          "Content-Type": "application/json",
          authorization: "Bearer " + token,
        },
      });

      let result = await response.json();
      getData("/api/cuffs/get", setCuffs);
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id: string) => {
    const api = "/api/cuffs/delete/" + id;
    try {
      const response = await fetch(`${import.meta.env.VITE_API_HOST}${api}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          authorization: "Bearer " + token,
        },
      });
      let result = await response.json();
      getData("/api/cuffs/get", setCuffs);
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };
  return admin ? (
    <>
      <div className="fixed top-14 h-12 w-full bg-white px-2 border-bottom border-2 flex items-center justify-center">
        <h1 className="text-xl">Polsini</h1>
      </div>
      <div className="pt-28 p-3">
        <form className="flex flex-col gap-y-4">
          <div>
            <label className="text-xl">Nome:</label>
            <input
              className="w-full h-10 px-5 border-2"
              type="text"
              placeholder="Inserisci il nome..."
              name="name"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="flex">
            <p className="text-xl w-1/3">Foto:</p>

            <input
              type="file"
              name="file"
              onChange={(e) =>
                e.target.files ? setFile(e.target.files[0]) : null
              }
            />
          </div>

          <button
            type="button"
            className="bg-slate-900 text-white h-8 w-1/3 self-end"
            onClick={(e) => handleCreate()}
          >
            Aggiungi
          </button>
          <hr />
        </form>
        <div className="grid grid-cols-1 gap-2 mt-2">
          {loading ? (
            <Loading />
          ) : (
            cuffs.map((item, index) => (
              <div key={item._id} className="flex w-full border-2 gap-2">
                <div className="flex flex-col items-center">
                  <img src={item.imageUrl} className="w-28" alt="" />
                  <i
                    className="fa fa-trash text-2xl text-red-800"
                    aria-hidden="true"
                    onClick={() => handleDelete(item._id)}
                  ></i>
                </div>
                <div className="flex flex-col justify-evenly">
                  <input
                    type="text"
                    name="name"
                    defaultValue={item.name}
                    onChange={(e) =>
                      setUpdate((update) => ({
                        ...update,
                        _id: item._id,
                        name: e.target.value,
                      }))
                    }
                  />
                  <button
                    type="button"
                    className="bg-slate-900 text-white h-8 w-2/5 self-end"
                    onClick={() => handleUpdate()}
                  >
                    Aggiorna
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  ) : (
    <Modal show={showModal} handleModal={handleModal} title={"Accesso negato"}>
      Non hai i permessi per accedere a questa sezione
    </Modal>
  );
}

export function ManageOrders() {
  const [users, setUsers] = useState<UserMDB[]>([]);

  const token = userStore((store) => store.token);
  const admin = userStore((store) => store.admin);
  useEffect(() => {
    token && admin ? getData("/api/users/order/all") : setShowModal(true);
  }, [token, admin]);

  // MODAL
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const handleModal = (show: boolean) => {
    setShowModal(show);
    navigate("/");
  };

  const handleUpdate = async (orderId: String, status: Order["state"]) => {
    const api = "/api/users/order/update/" + orderId;
    try {
      const response = await fetch(`${import.meta.env.VITE_API_HOST}${api}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          authorization: "Bearer " + token,
        },
        body: JSON.stringify({ status }),
      });
      console.log(response);

      let result = await response.json();
      console.log(result);
      getData("/api/users/order/all");
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
            ></i>
            In lavorazione
          </p>
        );
      case "shipped":
        return (
          <i
            className="fa fa-circle text-sm text-blue-400"
            aria-hidden="true"
          ></i>
        );
      case "canceled":
        return (
          <i
            className="fa fa-circle text-sm text-red-600"
            aria-hidden="true"
          ></i>
        );
      case "delivered":
        return (
          <i
            className="fa fa-circle text-sm text-green-700"
            aria-hidden="true"
          ></i>
        );
    }
  };

  const getData = async (api: string) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_HOST}${api}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: "Bearer " + token,
        },
      });

      let result = await response.json();
      console.log(result);
      setUsers(result);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={(admin ? "xsm:container xsm:mx-auto mt-20 p-4" : "")}>
      <div>
        <h1 className="text-2xl">Gestisci gli ordini</h1>
        {admin ? (
          users?.map((item, index) => (
            <div
              key={item.orders._id}
              className="border bg-zinc-400 w-full my-4"
            >
              <details className="bg-white p-2 border-2 mx-auto overflow-hidden open:!max-h-[400px]">
                <summary className="cursor-pointer marker:text-transparent grid grid-cols-5 gap-x-4 items-center">
                  {/* {renderState(item.orders.state)} */}
                  <select
                    className="col-span-2 sm:col-span-1"
                    defaultValue={item.orders.state}
                    onChange={(e) =>
                      handleUpdate(
                        item.orders._id,
                        e.target.value as Order["state"]
                      )
                    }
                    name="status"
                  >
                    <option value="pending">In lavorazione</option>
                    <option value="shipped">Spedito</option>
                    <option value="delivered">Consegnato</option>
                    <option value="canceled">Cancellato</option>
                  </select>
                  <p className="col-span-2 overflow-scroll sm:overflow-auto">
                    {item.email}
                  </p>
                  <p className="hidden md:block md:whitespace-nowrap">
                    {new Date(item.orders.date).toLocaleString()}
                  </p>
                  <p className="justify-self-end">
                    {item.orders.price.toFixed(2)} &euro;
                  </p>
                  {/* <button onClick={()=>handleUpdate(item.orders._id,item._id,item.orders.state)}>send</button> */}
                </summary>

                <hr className="my-2 scale-x-150" />

                <div className="text -m-4 -mt-2 p-4 bg-gray-50">
                  <div className="grid grid-cols-2">
                    <div>
                      <p className="text-sm italic">Data ordine:</p>
                      <p>{new Date(item.orders.date).toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-sm italic">Spedizione:</p>
                      <p>{item.orders.shipment.name}</p>
                      <p>{item.orders.shipment.address}</p>
                      <p>
                        {item.orders.shipment.city}(
                        {item.orders.shipment.province})
                      </p>
                      <p>{item.orders.shipment.cap}</p>
                    </div>
                    <div className="col-span-2 border-2 p-1">
                      <p className="text-sm italic">Articoli:</p>
                      <div className="h-44 overflow-y-scroll">
                        {item.orders.articles.customShirts.map(
                          (item, index) => (
                            <div
                              key={item._id}
                              className="grid grid-cols-12 gap-x-2 p-2"
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
                          )
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </details>
            </div>
          ))
        ) : (
          <Modal
            show={showModal}
            handleModal={handleModal}
            title={"Accesso negato"}
          >
            Non hai i permessi per accedere a questa sezione
          </Modal>
        )}
      </div>
    </div>
  );
}
