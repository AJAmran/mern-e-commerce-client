import React from "react";
import Navbar from "../components/shared/header/Navbar";
import { Outlet } from "react-router-dom";
import Header from "../components/shared/header/head";
import Footer from "../components/shared/footer/Footer";

const Main = () => {
  return (
    <div>
      <Header></Header>
      <Navbar></Navbar>
      <div className="">
        <Outlet />
      </div>
      <Footer></Footer>
    </div>
  );
};

export default Main;
