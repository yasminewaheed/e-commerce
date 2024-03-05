import React from "react";
import { useParams } from "react-router-dom";
import Useproduct, { getApisinglebrand } from "./Useproduct";
import Loading from "./Home/Loading";
import { Helmet } from "react-helmet";

export default function BrandsDetails() {
  let { id } = useParams();
  let { data, isLoading, error, isError } = Useproduct(
    "productsinglebrand",
    () => getApisinglebrand(id)
  );
  console.log(data?.data?.data);

  if (isLoading) return <Loading></Loading>;
  if (isError) return <h2>{error.message}</h2>;

  return (
    <>
      <Helmet>
        <title>Brand Details</title>
        <link
          rel="apple-touch-icon"
          href="../src/images/apple-touch-icon.png"
        />
        <link rel="icon" href="../src/images/favicon.ico" />
      </Helmet>
      <div className="w-25 m-auto fs-3 p-5">
        <p className="fw-bolder text-main">{data?.data?.data?.name}</p>
        <img src={data?.data?.data?.image} className="w-100" alt="" />
        <p>{data?.data?.data?.slug}</p>
      </div>
    </>
  );
}
