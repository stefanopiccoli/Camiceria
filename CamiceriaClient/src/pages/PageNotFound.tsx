import { Link } from "react-router-dom";

export default function PageNotFound() {
  return (
    <div className="h-screen w-full fixed top-0 left-0 bg-gray-100 -z-10 flex flex-col justify-center items-center gap-4">
      <p>Pagine non trovata</p>
      <button className="w-1/3 h-8 border bg-slate-900 rounded text-white">
        <Link to={"/"}>Home</Link>
      </button>
    </div>
  );
}
