import axios from "axios";
import React from "react";
import { Helmet } from "react-helmet";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { date } from "yup";
import Loading from "../Home/Loading";
export default function Brands() {
  function getbran() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/brands`);
  }
  let { data, refetch, isLoading, isError, error } = useQuery(
    "brands",
    getbran,
    {
      enabled: false,
    }
  );
  console.log(data?.data?.data);
  if (isLoading) return <Loading></Loading>;
  if (isError) return <h2>{error.message}</h2>;
  return (
    <div className="container">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Brands</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      <h2 className="cursor-pointer fw-bolder text-main" onClick={refetch}>
        All Brands
      </h2>
      <div className="row">
        {data?.data?.data?.map((bran) => (
          <>
            <div className="col-md-3" key={bran._id}>
              <Link
                to={`/BrandsDetails/${bran._id}`}
                style={{ textDecoration: "none", textDecorationStyle: "none" }}
              >
                <div className="card m-3 ">
                  <img src={bran.image} alt="" />
                  <p
                    className="text-center
              "
                  >
                    {bran.name}
                  </p>
                </div>
              </Link>
            </div>
          </>
        ))}
      </div>
    </div>
  );
}
