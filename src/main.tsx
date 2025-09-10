import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import "./index.css";

import Navbar from "./components/layout/Navbar";
import HomePage from "./pages/HomePage";
import Users from "./pages/Users";
import Posts from "./pages/Posts";

function WithNavbar() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route element={<WithNavbar />}>
          <Route path="/users" element={<Users />} />
          <Route path="/posts" element={<Posts />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
