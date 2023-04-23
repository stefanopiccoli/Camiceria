import colletto from "../assets/images/collar.webp";
import tessuto from "../assets/images/fabric.webp";
import polsino from "../assets/images/cuff.webp";
import { Link, Outlet, useLocation } from "react-router-dom";
import { useState } from "react";

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
  const [name, setName] = useState("");
  const [buttons, setButtons] = useState("0");
  const [file, setFile] = useState<any>();
  const handleSubmit = async () => {
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
          {/* <label>{file && `${file?.name} - ${file?.type} - ${file?.size}`}</label> */}
          <br />
          <button type="button" className="bg-slate-900 text-white h-8 w-1/3 self-end" onClick={(e) => handleSubmit()}>Aggiungi</button>
        </form>
      </div>
    </>
  );
}
