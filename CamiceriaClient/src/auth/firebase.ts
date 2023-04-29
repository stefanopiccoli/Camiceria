
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyCQ1YyfXLXVaNM-iDYWXwRbAbiAXblX6wI",
  authDomain: "camiceria-924ff.firebaseapp.com",
  projectId: "camiceria-924ff",
  storageBucket: "camiceria-924ff.appspot.com",
  messagingSenderId: "648488386511",
  appId: "1:648488386511:web:e76d4c36c176297ebddcba"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
