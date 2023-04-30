import ReactDOM from "react-dom/client";
import NavigationBar from "./components/NavigationBar";
import { ShirtConfiguration } from "./pages/ShirtConfiguration";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import "./index.css";
import Summary from "./pages/Summary";
import CartPage from "./pages/CartPage";
import ManageArticles, { ManageCollars } from "./pages/ManageArticles";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./auth/firebase";
import { userStore } from "./store/User";

function App() {
  const setUser = userStore((store)=> store.setUser);
  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
  }, []);
  return (
    <BrowserRouter>
    <NavigationBar></NavigationBar>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="ciaoo" element={<Home />} />
      <Route path="registrati" element={<Signup />} />
      <Route path="accedi" element={<Login />} />
      <Route path="camicie-personalizzate" element={<ShirtConfiguration />} />
      <Route path="riepilogo" element={<Summary />} />
      <Route path="carrello" element={<CartPage />} />
      <Route path="gestione-articoli" element={<ManageArticles />} />
      <Route path="gestione-articoli/colletti" element={<ManageCollars />}></Route>
    </Routes>
  </BrowserRouter>
  )
}

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <App/>
);
