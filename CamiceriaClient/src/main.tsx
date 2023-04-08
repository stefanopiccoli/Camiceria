import React from "react";
import ReactDOM from "react-dom/client";
import NavigationBar from "./components/NavigationBar";
import { ShirtConfiguration } from "./components/ShirtConfiguration";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import './index.css'

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
    <NavigationBar></NavigationBar>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ciao" element={<Home />} />
        <Route path="/camicie-personalizzate" element={<ShirtConfiguration />} />
      </Routes>
    </BrowserRouter>
    {/* <ShirtConfiguration></ShirtConfiguration> */}
  </React.StrictMode>
);
