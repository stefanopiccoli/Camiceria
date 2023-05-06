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
    <div className="bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-100 via-blue-300 to-blue-500">
      {user ? (
        <div>
          {/* {user.email}{user.emailVerified}
          <div
            onClick={() =>
              signOut(auth)
                .then(() => console.log("Signed out"))
                .catch((error) => console.log(error))
            }
          >
            logout
          </div> */}
        </div>
      ) : (
        <div className="h-screen py-16 md:py-28 px-4 container mx-auto">
          <form
            onSubmit={(e) => handleSubmit(e)}
            className="bg-slate border-2 p-4 mx-auto rounded-md mt-12 bg-white/90 shadow-md shadow-slate-900 max-w-[400px] h-[500px]"
          >
            <h1 className="text-3xl text-center pb-10">Accedi</h1>
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
            <div className="flex justify-center items-center mt-10">
              <button
                type="submit"
                className="border-2 w-1/2 bg-white text-slate-900 text-xl rounded-md"
              >
                Accedi
              </button>
            </div>
            <p className="mt-10 text-xl">
              Non hai ancora un account?{" "}
              <Link to="/registrati" className="underline underline-offset-1">
                Registrati
              </Link>{" "}
            </p>
          </form>
          {error !== "" ? (
            <div className="bg-red-400 shadow w-5/6 mx-auto mt-10 p-2 rounded-md">
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
