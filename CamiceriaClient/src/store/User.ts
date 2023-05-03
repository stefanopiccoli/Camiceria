import { UserCredential } from "firebase/auth";
import { create } from "zustand";
import { User } from "../interfaces/interfaces";
import { User as FirebaseUser } from "firebase/auth";

interface UserActions {
  setUser: (user: FirebaseUser | null) => void;
  setToken: (token: string | null) => void;
  setAdmin: () => void;
}

export const userStore = create<User & UserActions>((set, get) => ({
  user: null,
  setUser: (user) => set(() => ({ user: user })),
  token: null,
  setToken: (token) => set(() => ({ token: token })),
  admin: false,
  setAdmin: async () => {
    try {
      const api = "/api/users/getRole";
      const response = await fetch(`${import.meta.env.VITE_API_HOST}${api}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: "Bearer " + get().token,
        },
      });
      const result = await response.json();
      console.log(result);
      if (result.admin === true)
      set(()=>({admin:true}))
      else
      set(()=>({admin:false}))

    } catch (error) {
      // console.log(error);
      set(()=>({admin: false}))
    }
  },
}));
