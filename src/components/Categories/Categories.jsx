import axios from "axios";
import React from "react";
import { Helmet } from "react-helmet";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import Loading from "../Home/Loading";
export default function Categories() {
  function getApi() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/categories`);
  }
  let { data, isLoading, isError, error } = useQuery("sub", getApi);
  console.log(data?.data?.data);
  if (isLoading) return <Loading></Loading>;
  if (isError) return <h2>{error.message}</h2>;
  return (
    <div>
      {" "}
      <Helmet>
        <meta charSet="utf-8" />
        <title>Categories</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      <div className="container py-3">
        <div className="row gy-3">
          {data?.data?.data?.map((bran) => (
            <div className="col-md-4" key={bran._id}>
              <Link
                to={`/Catedetails/${bran._id}/subcategories`}
                style={{ textDecoration: "none", textDecorationStyle: "none" }}
                className="text-black fw-bolder text-center"
              >
                {" "}
                <div className="card" style={{ height: "400px" }}>
                  <div className="card-body">
                    <img
                      src={bran.image}
                      className="w-100"
                      style={{ height: "300px" }}
                      alt=""
                    />
                  </div>
                  <div className="card-footer">
                    <p className="text-main">{bran.name}</p>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
