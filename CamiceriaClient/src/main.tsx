import React from "react";
import ReactDOM from "react-dom/client";
import NavigationBar from "./components/NavigationBar";
import { ShirtConfiguration } from "./pages/ShirtConfiguration";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import "./index.css";
import Summary from "./pages/Summary";
import CartPage from "./pages/CartPage";
import ManageArticles, { ManageCollars } from "./pages/ManageArticles";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <BrowserRouter>
    <NavigationBar></NavigationBar>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="ciaoo" element={<Home />} />
      <Route path="camicie-personalizzate" element={<ShirtConfiguration />} />
      <Route path="riepilogo" element={<Summary />} />
      <Route path="carrello" element={<CartPage />} />
      <Route path="gestione-articoli" element={<ManageArticles />} />
      <Route path="gestione-articoli/colletti" element={<ManageCollars />}></Route>
    </Routes>
  </BrowserRouter>
);
