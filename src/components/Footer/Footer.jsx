import React from "react";
import img1 from "../../assets/American-Express-Logo-PNG-Image.webp";
import img2 from "../../assets/580b57fcd9996e24bc43c530.webp";
import img3 from "../../assets/MasterCard_logo.webp";
import img4 from "../../assets/Amazon-Pay-logo.svg";
import img5 from "../../assets/App_Store_(iOS)-Badge-Logo.wine.svg";
import img6 from "../../assets/google-play-badge.webp";
export default function Footer() {
  return (
    <div className="p-5" style={{ backgroundColor: " #F8F9FA" }}>
      <h2>Get The FreshCart app</h2>
      <p>we will send you a link, open it on your phone to download the app</p>
      <div className="container">
        <div className="row">
          <div className="col-lg-9">
            <input className="form-control" placeholder="Email..."></input>
          </div>
          <div className="col-lg-3">
            <button className="btn bg-main w-100 text-white">
              Share App Link
            </button>
          </div>
        </div>
      </div>
      <hr className="w-100" style={{ opacity: ".08" }}></hr>
      <div className=" d-flex justify-content-between align-items-center">
        <div className="box1 d-flex">
          <h5
            style={{ fontWeight: "bold", fontSize: "13px", marginTop: "12px" }}
          >
            {" "}
            Payment Partners
          </h5>
          <img src={img4} alt="" width={90} height={50} className="" />
          <img src={img1} alt="" width={50} height={50} className=" me-1" />
          <img src={img3} alt="" width={50} height={40} className="me-1" />
          <img src={img2} alt="" width={70} height={40} />
        </div>
        <div className="box2 d-flex align-items-center ">
          <h5
            style={{ fontWeight: "bold", fontSize: "13px", marginTop: "10px" }}
          >
            Get deliveries With FreshCard
          </h5>
          <img src={img5} alt="" width={100} />
          <img src={img6} alt="" width={80} />
        </div>
      </div>
      <hr className="w-100" style={{ opacity: ".08" }}></hr>
    </div>
  );
}
