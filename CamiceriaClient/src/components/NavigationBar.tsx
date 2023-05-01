import { Link, Outlet } from "react-router-dom";
import "../../node_modules/font-awesome/css/font-awesome.min.css";
import { useState } from "react";
import { userStore } from "../store/User";
import { signOut } from "firebase/auth";
import { auth } from "../auth/firebase";
import { cartStore } from "../store/Cart";

function NavigationBar() {
  const user = userStore((store) => store.user);
  const setUser = userStore((store) => store.setUser);
  const setToken = userStore((store) => store.setToken);
  const refreshCart = cartStore((store) => store.refreshCustomShirts);

  const handleLogOut = () => {
    signOut(auth)
      .then(() => {
        console.log("Signed out");
        setUser(null);
        setToken(null);
        setMenu("closed");
        refreshCart();
      })
      .catch((error) => console.log(error));
  };

  const [menu, setMenu] = useState<"open" | "closed">("closed");
  return (
    <>
      <div className="fixed top-0 bg-slate-900 h-14 w-full z-30">
        <div className="container px-6 mx-auto h-full flex justify-between items-center">
          <i
            className="fa text-2xl fa-bars text-white"
            aria-hidden="true"
            onClick={(e) => {
              setMenu("open");
            }}
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
          <div className="h-full flex flex-col justify-between pb-28">
            <i
              className="fa fa-times text-2xl text-white absolute right-4 top-2"
              aria-hidden="true"
              onClick={() => setMenu("closed")}
            ></i>
            <div className="w-3/4 mt-14 mx-auto ">
              <Link to="/camicie" onClick={() => setMenu("closed")}>
                {/* <h3 className="text-center text-white text-2xl">Camicie</h3> */}
              </Link>
              <Link
                to="/camicie-personalizzate"
                onClick={() => setMenu("closed")}
              >
                <h3 className="text-center text-white text-2xl">
                  Crea la tua camicia
                </h3>
              </Link>
              <Link to="/cravatte" onClick={() => setMenu("closed")}>
                {/* <h3 className="text-center text-white text-2xl">Cravatte</h3> */}
              </Link>
              <Link to="/gestione-articoli" onClick={() => setMenu("closed")}>
                <h3 className="text-center text-white text-2xl">
                  Gestisci articoli
                </h3>
              </Link>
            </div>
            <div>
              {user ? (
                <div className="text-center text-white text-lg ">
                  {user.email}
                  <p onClick={() => handleLogOut()} className="underline">
                    Logout
                  </p>
                </div>
              ) : (
                <div className="w-3/4 h-12 mt-20 mx-auto bg-slate-100 flex justify-center items-center">
                  <Link to="/accedi" onClick={()=>setMenu("closed")}>
                    <h3>Accedi</h3>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default NavigationBar;
