import { Link, Outlet } from "react-router-dom";
import "../../node_modules/font-awesome/css/font-awesome.min.css";
import { useState } from "react";

function NavigationBar() {
  const [menu, setMenu] = useState<"open" | "closed">("closed");
  return (
    <>
      <div className="h-14 w-full"></div> {/*Spacing sotto la navbar */}
      <div className="fixed top-0 bg-slate-900 h-14 w-full z-30">
        <div className="container px-6 mx-auto h-full flex justify-between items-center">
          <i
            className="fa text-2xl fa-bars text-white"
            aria-hidden="true"
            onClick={(e) => {setMenu("open")}}
          ></i>
          <Link to="/">
          <h1 className="text-white font-serif">Camiceria</h1>
          </Link>
          <Link to="/carrello">
          <i
            className="fa text-2xl fa-shopping-cart text-white "
            aria-hidden="true"
          ></i>
          </Link>
        </div>
        <div
          className={
            "absolute top-0 left-0 overflow-hidden " +
            (menu === "open" ? "w-full" : "w-0") +
            " h-screen bg-slate-800 "
          }
        >
          <i
            className="fa fa-times text-2xl text-white absolute right-4 top-2"
            aria-hidden="true"
            onClick={() => setMenu("closed")}
          ></i>
          <div className="w-3/4 h-12 mt-20 mx-auto bg-slate-100 flex justify-center items-center">
            <h3>Accedi</h3>
          </div>
          <div className="w-3/4 mt-14 mx-auto ">
            <Link to="/camicie" onClick={()=> setMenu("closed")}>
              <h3 className="text-center text-white text-2xl">Camicie</h3>
            </Link>
            <Link to="/camicie-personalizzate" onClick={()=> setMenu("closed")}>
              <h3 className="text-center text-white text-2xl">
                Camicie personalizzate
              </h3>
            </Link>
            <Link to="/cravatte" onClick={()=> setMenu("closed")}>
              <h3 className="text-center text-white text-2xl">Cravatte</h3>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default NavigationBar;
