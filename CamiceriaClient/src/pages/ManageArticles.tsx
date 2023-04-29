import colletto from "../assets/images/collar.webp";
import tessuto from "../assets/images/fabric.webp";
import polsino from "../assets/images/cuff.webp";
import { Link, Outlet, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Collar } from "../interfaces/interfaces";
import { CollarCard } from "../components/Card";
import Loading from "../components/Loading";

export default function ManageArticles() {
  const location = useLocation();
  return (
    <>
      <div className="grid grid-cols-2 gap-4 p-4">
        <Link to="colletti">
          <div className="border-2">
            <img src={colletto} alt="" />
            <p className="text-center">Colletti</p>
          </div>
        </Link>

        <div className="border-2">
          <img src={tessuto} alt="" />
          <p className="text-center">Tessuti</p>
        </div>
        <div className="border-2">
          <img src={polsino} alt="" />
          <p className="text-center">Polsini</p>
        </div>
      </div>
    </>
  );
}

export function ManageCollars() {
  console.log("reload");

  const [loading, setLoading] = useState(true);
  const [collars, setCollars] = useState<Collar[]>([]);
  const [name, setName] = useState("");
  const [buttons, setButtons] = useState("");
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
        },
      });
      let result = await response.json();
      getData("/api/collars/get", setCollars);
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="h-14"></div>
      <div className="fixed top-14 h-12 w-full bg-white px-2 border-bottom border-2 flex items-center justify-center">
        <h1 className="text-xl">Colletti</h1>
      </div>
      <div className="p-3">
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
          {loading ? <Loading/> :
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
          ))}
        </div>
      </div>
    </>
  );
}
