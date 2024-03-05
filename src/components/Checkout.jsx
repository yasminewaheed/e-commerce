import React, { useContext, useState } from "react";
import {
  UseCard1,
  Usecard,
  checkout,
  deletcard,
  getcard,
  updatacard,
} from "./Usecart";
import { UserContext } from "./Context/UserContext";
import { Helmet } from "react-helmet";

export default function Checkout() {
  let { mutate, data: deleted } = UseCard1(deletcard);
  let { mutate: mutated, data: update } = UseCard1(updatacard);
  let { mutate: mutatedonline, data: online } = UseCard1(checkout);
  let { isopen, setisopen } = useContext(UserContext);
  let { data, isError, isFetching, isLoading, error } = Usecard(
    "getcard",
    getcard
  );
  let [details, setdetails] = useState("");
  let [phone, setphone] = useState("");
  let [city, setcity] = useState("");
  function addaddress(e) {
    e.preventDefault();
    let shippingAddress = {
      details,
      phone,
      city,
    };
    mutatedonline({ id: data?.data?.data?._id, shippingAddress });
    if (online?.data?.status === "success")
      window.location.href = online?.data?.session?.url;
    console.log(data?.data?.data?._id);
    console.log(online);
    console.log(online?.data?.session?.url);
    console.log(online);
  }

  return (
    <div className="bg-light">
      <Helmet>
        <title>Check out</title>
        <link
          rel="apple-touch-icon"
          href="../src/images/apple-touch-icon.png"
        />
        <link rel="icon" href="../src/images/favicon.ico" />
      </Helmet>
      <div className="container">
        <form>
          <div class="mb-3">
            <label for="recipient-name" class="col-form-label">
              Details:
            </label>
            <input
              type="text"
              class="form-control"
              id="recipient-name"
              onChange={(e) => setdetails(e.target.value)}
            />
          </div>
          <div class="mb-3">
            <label for="recipient-name" class="col-form-label">
              phone:
            </label>
            <input
              type="number"
              class="form-control"
              id="recipient-name"
              onChange={(e) => setphone(e.target.value)}
            />
          </div>

          <div class="mb-3">
            <label for="recipient-name" class="col-form-label">
              City:
            </label>
            <input
              type="text"
              class="form-control"
              id="recipient-name"
              onChange={(e) => setcity(e.target.value)}
            />
          </div>
          <button
            type="sumbit"
            className="btn bg-main text-white w-100"
            onClick={addaddress}
          >
            Pay now
          </button>
        </form>
      </div>
    </div>
  );
}
