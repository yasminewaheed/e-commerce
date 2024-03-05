import React, { useState } from "react";
import SimpleSlider from "../Slidermain";
import Categoriesslider from "../Categoriesslider";
import { Helmet } from "react-helmet";
import Loading from "./Loading";
import Useproduct, { getApi } from "../Useproduct";
import { Link } from "react-router-dom";
import { Addtocard, Addtowish, UseCard1 } from "../Usecart";

export default function Home() {
  let { data, isFetching, isLoading, error, isError } = Useproduct(
    "product",
    getApi
  );
  if (isLoading) return <Loading></Loading>;
  if (isError) return <h2>{error.message}</h2>;
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Home</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      {/* <Carts /> */}
      <SimpleSlider />
      <Categoriesslider />
      <div className="container-fluid px-5">
        <div className="row gy-4">
          {data?.data?.data.map((prod) => (
            <Product prod={prod} key={prod._id}></Product>
          ))}
        </div>
      </div>
    </>
  );
}
function Product({ prod }) {
  let { data, isLoading, error, isError, mutate } = UseCard1(Addtocard);
  let [heart, setheart] = useState(false);
  let { mutate: mutate1 } = UseCard1(Addtowish);
  // console.log(data?.data?.message);
  return (
    <div className="col-md-2">
      <div className="product cursor-pointer p-2">
        <i
          className="fa-solid fa-heart m-3"
          style={heart ? { color: "red" } : { color: "unset" }}
          onClick={() => {
            setheart(!heart);
            mutate1(prod._id);
          }}
        ></i>
        <Link
          to={`/ProductDetails/${prod._id}`}
          style={{ textDecoration: "none", textDecorationStyle: "none" }}
          className="text-black"
        >
          {" "}
          <img src={prod.imageCover} className="w-100 mb-2" alt="" />
          <h6 className=" text-main">{prod.category.name}</h6>
          <p className="fw-bolder">{prod.title.split("").splice(0, 14)}</p>
          <div className="box d-flex justify-content-between">
            <span>{prod.price} EGP</span>
            <span>
              {prod.ratingsAverage}
              <i className="fa-solid fa-star rating-color"></i>
            </span>
          </div>
        </Link>
        <button
          className="btn btn-brd"
          onClick={() => {
            mutate(prod._id);
          }}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
