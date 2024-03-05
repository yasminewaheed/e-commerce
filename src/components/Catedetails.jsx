import React from "react";
import { useParams } from "react-router-dom";
import Useproduct, { getApisinglecate } from "./Useproduct";
import Loading from "./Home/Loading";
import { Addtocard, UseCard1 } from "./Usecart";
import { Helmet } from "react-helmet";

export default function Catedetails() {
  let { mutate } = UseCard1(Addtocard);
  let { id } = useParams();
  let { data, isFetching, isLoading, error, isError } = Useproduct(
    "catesingle",
    () => getApisinglecate(id)
  );
  console.log(data?.data?.data);
  if (isLoading) return <Loading></Loading>;
  if (isError) return <h2>{error.message}</h2>;

  return (
    <div className="container py-5">
      <Helmet>
        <title>SubCategories</title>
        <link
          rel="apple-touch-icon"
          href="../src/images/apple-touch-icon.png"
        />
        <link rel="icon" href="../src/images/favicon.ico" />
      </Helmet>

      <div className="row g-3">
        {data?.data?.data?.map((cate) => (
          <div
            style={{ width: "24%" }}
            className="card col-md-4 fw-bold fs-5 p-3 me-2 text-center"
            key={cate._id}
          >
            {cate.name}
          </div>
        ))}
      </div>
    </div>
  );
}
