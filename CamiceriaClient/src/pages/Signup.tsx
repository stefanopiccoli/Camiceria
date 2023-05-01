import { createUserWithEmailAndPassword, deleteUser } from "firebase/auth";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../auth/firebase";

export default function Signup() {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e : React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const api = "/api/users/create";
    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        try {
          const response = fetch(`${import.meta.env.VITE_API_HOST}${api}`, {
            method: "POST",
            body: JSON.stringify({ _id: user.uid }),
            headers: {
              "Content-Type": "application/json",
            },
          });
          setError("");
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
    <div className="h-screen pt-16">
      <div className="text-center">
        <h1 className="text-3xl">Camiceria</h1>
        <h1 className="text-xl">Crea il tuo account</h1>
      </div>
      <form
        onSubmit={(e) => handleSubmit(e)}
        className="bg-slate border-2 border-slate-900 p-4 w-3/4 mx-auto rounded-md mt-12 bg-cyan-600"
      >
        <p>E-mail:</p>
        <input
          className="w-full"
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <p className="mt-8">Password:</p>

        <input
          className="w-full"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <div className="flex justify-center items-center mt-10">
          <button
            className="border-2 w-1/2 bg-white text-slate-900 rounded-md"
            type="submit"
          >
            Registrati
          </button>
        </div>
        <p className="mt-10">
          Hai già un account?
          <Link to="/accedi" className="underline underline-offset-1">
            Log In
          </Link>
        </p>
      </form>
      {error !== "" ? (
        <div className="bg-red-300 w-5/6 mx-auto mt-10 p-2 rounded-md">
          {error.split(":")[1]}
        </div>
      ) : null}
    </div>
  );
}
