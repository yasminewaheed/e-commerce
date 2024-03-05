import React, { useContext, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Nav from "./Nav/Nav";
import Footer from "./Footer/Footer";
import { UserContext } from "../components/Context/UserContext";

export default function Layout() {
  let { setUsertoken, setlogin } = useContext(UserContext);
  useEffect(() => {
    if (localStorage.getItem("userToken") !== null) {
      setUsertoken(localStorage.getItem("userToken"));
      setlogin(localStorage.getItem("userName"));
    }
  }, []);

  return (
    <>
      <div className="parent">
        <Nav />
        <div className="">
          <Outlet />
        </div>
        <Footer />
      </div>
    </>
  );
}
