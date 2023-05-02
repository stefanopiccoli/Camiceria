import ReactDOM from "react-dom/client";
import NavigationBar from "./components/NavigationBar";
import { ShirtConfiguration } from "./pages/ShirtConfiguration";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import "./index.css";
import Summary from "./pages/Summary";
import CartPage from "./pages/CartPage";
import ManageArticles, { ManageCollars, ManageCuffs, ManageFabrics } from "./pages/ManageArticles";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import OrderForm from "./pages/OrderForm";
import { userStore } from "./store/User";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./auth/firebase";
import Profile from "./pages/Profile";

function App() {
  const setUser = userStore((store)=> store.setUser);
  const setToken = userStore((store)=> store.setToken);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        user.getIdToken().then((token)=>{
          setToken(token);
        })
      } else {
        setUser(null);
        setToken(null)
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
      <Route path="ordine" element={<OrderForm/>}></Route>
      <Route path="profilo" element={<Profile/>}></Route>
      <Route path="gestione-articoli" element={<ManageArticles />} />
      <Route path="gestione-articoli/colletti" element={<ManageCollars />}></Route>
      <Route path="gestione-articoli/tessuti" element={<ManageFabrics />}></Route>
      <Route path="gestione-articoli/polsini" element={<ManageCuffs />}></Route>
    </Routes>
  </BrowserRouter>
  )
}

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <App/>
);
