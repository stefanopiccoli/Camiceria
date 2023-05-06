import { Link } from "react-router-dom";
import homeimg from "../assets/images/home3.jpg";
import { userStore } from "../store/User";
import shirtimg from "../assets/images/shirts.webp";

export default function Home() {
  const user = userStore((store) => store.user);
  return (
    <>
      <div className="sm:grid sm:grid-cols-2 overflow-hidden sm:h-screen">
        {/* <div className="h-screen relative after:content-[''] after:bg-slate-800/70 after:w-full after:h-full after:absolute after:top-0 after:left-0 after:z-10">
          <img src={homeimg} alt="" className="object-cover h-full" />
          <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-evenly items-center z-20 p-4">
            <div className="w-full text-white">
              <p className="text-xl">Ciao, {user?.email}</p>
            </div>
            <button className="bg-white/80 text-slate-900 italic text-xl h-12 w-1/2 shadow-lg border-2 border-neutral-400">
              <Link to="/camicie-personalizzate">Crea la tua camicia</Link>
            </button>
          </div>
        </div> */}
        <img
          className="hidden w-full sm:block h-full object-cover"
          src={homeimg}
          alt=""
        />
        <div className="flex flex-col items-center justify-between h-screen overflow-hidden sm:justify-evenly">
          <div className="bg-slate-200 w-full py-16 pb-3 sm:hidden">
            <h1 className="text-center text-3xl bg-slate-200 ">Camiceria</h1>
          </div>
          <div>
            <p className="text-sm italic text-center lg:text-xl">Ciao,</p>
            <p className="text-lg underline lg:text-3xl">
              <Link to="/profilo">{user?.email}</Link>
            </p>
          </div>
          <button className="text-white bg-slate-900 italic text-xl h-12 shadow-md w-2/3 border-2 border-neutral-400 max-w-[300px] lg:text-3xl">
            <Link to="/camicie-personalizzate">Crea la tua camicia</Link>
          </button>
          <img className="sm:hidden w-full object-cover" src={shirtimg} alt="" />
        </div>
      </div>
    </>
  );
}
