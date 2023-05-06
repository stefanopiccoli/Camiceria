import { createUserWithEmailAndPassword, deleteUser } from "firebase/auth";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../auth/firebase";

export default function Signup() {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const api = "/api/users/create";

    if (password !== confirmPassword) {
      setError("Errore: Le password non coincidono");
      return;
    }

    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        try {
          const response = fetch(`${import.meta.env.VITE_API_HOST}${api}`, {
            method: "POST",
            body: JSON.stringify({ _id: user.uid, email }),
            headers: {
              "Content-Type": "application/json",
            },
          });
          setError("");
          navigate("/");
        } catch (error) {
          if (auth.currentUser)
            deleteUser(auth.currentUser)
              .then(() =>
                setError("Si è verificato un errore imprevisto, riprova")
              )
              .catch(() =>
                setError(
                  "Errore nella registrazione, contatta un amministratore"
                )
              );
        }
        console.log(user);
      })
      .catch((error) => {
        setError(error.message);
      });
  };
  return (
    <div className="h-screen px-4 py-16 md:py-28 bg-gradient-to-r from-cyan-200 to-cyan-400">
      <form
        onSubmit={(e) => handleSubmit(e)}
        className="bg-slate border-2 p-4 mx-auto rounded-md mt-12 bg-white/90 shadow-md shadow-slate-900 max-w-[400px] h-[500px]"
      >
        <h1 className="text-3xl text-center pb-10">Registrati</h1>
        <p className="text-xl">E-mail:</p>
        <input
          className="w-full shadow-inner"
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <p className="mt-8 text-xl">Password:</p>

        <input
          className="w-full shadow-inner"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <p className="mt-8 text-xl">Conferma password:</p>

        <input
          className="w-full shadow-inner"
          type="password"
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <div className="flex justify-center items-center mt-10">
          <button
            className="border-2 w-1/2 bg-white text-slate-900 text-xl rounded-md"
            type="submit"
          >
            Registrati
          </button>
        </div>
        <p className="mt-10 text-xl">
          Hai già un account?
          <Link to="/accedi" className="underline underline-offset-1">
            Log In
          </Link>
        </p>
      </form>
      {error !== "" ? (
        <div className="bg-red-400 shadow w-5/6 mx-auto mt-10 p-2 rounded-md">
          {error.split(":")[1]}
        </div>
      ) : null}
    </div>
  );
}
