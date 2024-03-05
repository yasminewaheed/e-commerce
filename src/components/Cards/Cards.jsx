import React, { useContext, useState } from "react";
import { UserContext } from "../Context/UserContext";
import img4 from "../../assets/preview.png";
import {
  Addtocard,
  UseCard1,
  UseCard2,
  Usecard,
  deletcard,
  deletcards,
  getwish,
} from "../Usecart";
import { Helmet } from "react-helmet";
import Loading from "../Home/Loading";

export default function Cards() {
  let { mutate, data: deleted } = UseCard2(deletcards);
  let { data, isError, isFetching, isLoading, error } = Usecard(
    "getwish",
    getwish
  );
  let { mutate: mutate2, data: data1 } = UseCard1(Addtocard);
  if (isLoading) return <Loading></Loading>;
  if (isError) return <h2>{error.message}</h2>;
  return (
    <div className="right">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Wish list</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      <div className="container" style={{ backgroundColor: "#F8F9FA" }}>
        <h3 className="fw-bolder m-4 p-3">My Wish list</h3>
        {data?.data?.data?.map((prod) => (
          <div className="row gy-3 justify-content-between align-items-center mb-2">
            <div className="col-md-8">
              <div className="row gy-3">
                <div className="col-md-2">
                  <img src={prod.imageCover} alt="" className="w-100" />
                </div>
                <div className="col-md-10">
                  <p className="fw-bolder mt-3">{prod.title}</p>
                  <p className="text-main">{prod.price} EGP</p>
                  <p
                    className="cursor-pointer text-danger fw-bolder"
                    onClick={() => {
                      mutate(prod._id);
                      console.log(prod._id);
                    }}
                  >
                    <i className="fa-solid fa-trash text-danger cursor-pointer"></i>
                    remove
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4 d-flex justify-content-end align-items-center">
              <div>
                <button
                  className="btn bg-main text-white mt-3 form-control"
                  onClick={() => {
                    mutate2(prod._id);
                  }}
                >
                  Add to card
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* <h2 className="text-main"> My Wish list is Empty</h2> */}
    </div>
  );
}
