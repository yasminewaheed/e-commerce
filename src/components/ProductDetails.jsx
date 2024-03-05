import React from "react";
import { useParams } from "react-router-dom";
import Useproduct, { getApisingle } from "./Useproduct";
import Loading from "./Home/Loading";
import { Addtocard, UseCard1 } from "./Usecart";
import { Helmet } from "react-helmet";

export default function ProductDetails() {
  let { mutate } = UseCard1(Addtocard);
  let { id } = useParams();
  let { data, isFetching, isLoading, error, isError } = Useproduct(
    "productsingle",
    () => getApisingle(id)
  );
  console.log(data?.data?.data?.imageCover);
  if (isLoading) return <Loading></Loading>;
  if (isError) return <h2>{error.message}</h2>;

  return (
    <div className="container py-5">
      <Helmet>
        <meta charSet="utf-8" />
        <title>ProductDetails</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      <div className="row align-items-center">
        <div className="col-md-4">
          <img src={data?.data?.data?.imageCover} className="w-100" alt="" />
        </div>
        <div className="col-md-8">
          <h3>{data?.data?.data?.title}</h3>
          <p>{data?.data?.data?.description}</p>

          <span className="text-main">{data?.data?.data?.category.name}</span>
          <div className="box d-flex justify-content-between">
            <span>{data?.data?.data?.price} EGP</span>
            <span>
              {data?.data?.data?.ratingsAverage}
              <i className="fa-solid fa-star rating-color"></i>
            </span>
          </div>
          <button
            className="btn bg-main text-white mt-3 form-control"
            onClick={() => {
              mutate(data?.data?.data?._id);
            }}
          >
            Add to card
          </button>
        </div>
      </div>
    </div>
  );
}
