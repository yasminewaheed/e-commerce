import React, { useState } from "react";
import Useproduct, { getApi } from "../Useproduct";
import Loading from "../Home/Loading";
import { Link } from "react-router-dom";
import { Addtocard, Addtowish, UseCard1 } from "../Usecart";
import { Helmet } from "react-helmet";
export default function Product() {
  let { data, isFetching, isLoading, error, isError } = Useproduct(
    "product",
    getApi
  );
  let [searched, setsearched] = useState([]);
  function search(e) {
    let term = e.target.value;
    // console.log(term);
    let newarray = data?.data?.data.filter((ele) =>
      ele.title.toLowerCase().trim().includes(term.toLowerCase().trim())
    );
    setsearched(newarray);
  }
  if (isLoading) return <Loading></Loading>;
  if (isError) return <h2>{error.message}</h2>;
  return (
    <div className="container-fluid px-5 mt-3">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Products</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      <div className="w-75 mx-auto bg-light p-3 mb-4">
        <input
          className="form-control my-3"
          type="text"
          onChange={search}
          placeholder="Search...."
        ></input>
      </div>
      <div className="row gy-4">
        {searched.length
          ? searched?.map((prod) => (
              <Producte prod={prod} key={prod._id}></Producte>
            ))
          : data?.data?.data.map((prod) => (
              <Producte prod={prod} key={prod._id}></Producte>
            ))}
      </div>
    </div>
  );
}
function Producte({ prod }) {
  let [heart, setheart] = useState(false);
  let { mutate } = UseCard1(Addtocard);
  let { mutate: mutate1, data } = UseCard1(Addtowish);

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
