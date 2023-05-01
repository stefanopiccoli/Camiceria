import {
  User,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import React, { useEffect, useState } from "react";
import { auth } from "../auth/firebase";
import { Link, useNavigate } from "react-router-dom";
import { userStore } from "../store/User";

export default function Login() {
  const user = userStore((store) => store.user);
  const setUser = userStore((store) => store.setUser);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        setError("");
        // if (redirect)
        //   navigate(redirect);
        navigate(-1);
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
    // if (msg)
    // setMessage(msg);
  }, []);
  return (
    <div className="pt-16">
      {user ? (
        <div>
          {user.email}{" "}
          <div
            onClick={() =>
              signOut(auth)
                .then(() => console.log("Signed out"))
                .catch((error) => console.log(error))
            }
          >
            logout
          </div>
        </div>
      ) : (
        <div className="h-screen pt-16">
          <div className="text-center">
            <h1 className="text-3xl">Camiceria</h1>
            <h1 className="text-xl">Accedi</h1>
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
                type="submit"
                className="border-2 w-1/2 bg-white text-slate-900 rounded-md"
              >Accedi
              </button>
            </div>
            <p className="mt-10">
              Non hai ancora un account?{" "}
              <Link to="/registrati" className="underline underline-offset-1">
                Registrati
              </Link>{" "}
            </p>
          </form>
          {error !== "" ? (
            <div className="bg-red-300 w-5/6 mx-auto mt-10 p-2 rounded-md">
              {error.split(":")[1]}
            </div>
          ) : null}
          {message !== "" ? (
            <div className="bg-green-400 w-5/6 mx-auto mt-10 p-2 rounded-md">
              {message}
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
}
