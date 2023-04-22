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
    formData.append('name',name);
    formData.append('buttons', buttons);
    formData.append('file',file);
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
    <div className="p-3">
      <h1>Inserisci un nuovo colletto</h1>
      <form>
        <label>Nome: </label>
        <input
          type="text"
          placeholder="Inserisci il nome..."
          name="name"
          onChange={(e) => setName(e.target.value)}
        />
        <br />
        <label>Bottoni: </label>
        <select
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
        <br />
        <input
          type="file"
          name="file"
          onChange={(e) => (e.target.files ? setFile(e.target.files[0]) : null)}
        />
        {/* <label>{file && `${file?.name} - ${file?.type} - ${file?.size}`}</label> */}
        <br />
        <div onClick={(e)=>handleSubmit()} >SUBMIT</div>

      </form>
    </div>
  );
}
