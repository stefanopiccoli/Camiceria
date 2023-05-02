import { UserCredential } from "firebase/auth"
import { create } from "zustand"
import { User } from "../interfaces/interfaces"
import { User as FirebaseUser } from "firebase/auth";

interface UserActions {
  setUser: (user: FirebaseUser | null) => void,
  setToken: (token: string | null) => void
}


export const userStore = create<User & UserActions>(set=>({
  user : null,
  setUser : (user) => set(()=>({user: user})),
  token: null,
  setToken : (token) => set(()=>({token: token}))
}))
