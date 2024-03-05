import React from "react";
import errorimg from "../../assets/error.svg";

export default function Notfound() {
  return (
    <>
      <section className="container my-2">
        <img
          src={errorimg}
          className="w-100 "
          style={{ height: "500px" }}
          alt=""
        />
      </section>
    </>
  );
}
