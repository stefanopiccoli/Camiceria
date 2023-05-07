import { Link, useNavigate } from "react-router-dom";
import homeimg from "../assets/images/home4.jpg";
import homeimgmobile from "../assets/images/home.webp";
import { userStore } from "../store/User";
import shirtimg from "../assets/images/shirts.webp";

export default function Home() {
  const user = userStore((store) => store.user);
  const navigate = useNavigate();
  return (
    <>
      {/* <div className="sm:grid sm:grid-cols-2 overflow-hidden sm:h-screen"> */}
      <div className="h-screen w-full relative after:content-[''] hero-gradient after:w-full after:h-full after:absolute after:top-0 after:left-0 after:z-10">
        <picture>
          <source media="(min-width:768px)" srcSet={homeimg} />
          <img src={homeimgmobile} className="object-cover h-full w-full" />
        </picture>
        <div className="absolute top-0 left-0 h-full w-full z-20 grid grid-cols-2 place-content-center place-items-center">
          <div></div>
          {/* <div className="w-full text-white">
              <p className="text-xl">Ciao, {user?.email}</p>
            </div> */}

          <button
            className="text-white bg-slate-950 italic text-xl h-12 w-[200px] shadow-lg col-span-2 md:col-span-1"
            onClick={() => navigate("/camicie-personalizzate")}
          >
            Crea la tua camicia
          </button>
        </div>
      </div>
    </>
  );
}
