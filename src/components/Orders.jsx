import axios from "axios";
import React, { useEffect, useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import { Helmet } from "react-helmet";
import { jwtDecode } from "jwt-decode";
import Loading from "./Home/Loading";
export default function Orders() {
  const [userAllOrders, setUserAllOrders] = useState(null);

  useEffect(function () {
    const user = jwtDecode(localStorage.getItem("userToken"));

    getUserOrders(user.id);
  }, []);

  async function getUserOrders(id) {
    try {
      const { data } = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/orders/user/${id}`
      );

      console.log(data);

      setUserAllOrders(data);
    } catch (error) {
      console.log("error", error);
    }
  }

  if (userAllOrders === null) {
    return <Loading></Loading>;
  }

  return (
    <div className="">
      <Helmet>
        <title>All orders</title>
        <link
          rel="apple-touch-icon"
          href="../src/images/apple-touch-icon.png"
        />
        <link rel="icon" href="../src/images/favicon.ico" />
      </Helmet>

      <div className=" m-auto py-5" style={{ width: "90%" }}>
        <table className="">
          <thead className="text-white py-4">
            <tr className="bg-main">
              <th style={{ width: "12%" }} className="ps-2">
                Product image
              </th>
              <th className="ps-4">Title</th>
              <th className="ps-3">Price</th>
              <th className="ps-4">Count</th>
              <th className="ps-4">Total price</th>
              <th className="ps-5">Phone</th>
              <th className="ps-3">City</th>
              <th className="ps-4">User email</th>
              <th className="pe-2">Payment method</th>
            </tr>
          </thead>
          {userAllOrders.map(function (order, index) {
            return (
              <tbody key={index}>
                {order.cartItems.map(function (item, idx) {
                  console.log(item);
                  return (
                    <tr key={idx}>
                      <td className="ps-2">
                        <img
                          className="w-50"
                          src={item.product.imageCover}
                          alt=""
                        />
                      </td>
                      <td className="fw-bold ">
                        {item.product.title.split(" ").slice(0, 2).join(" ")}
                      </td>
                      <td className="fw-bold ps-3">{item.price} EGP</td>
                      <td className="fw-bold ps-5">{item.count}</td>
                      <td className="fw-bold ps-4">
                        {item.price * item.count} EGP
                      </td>
                      <td className="fw-bold ps-3">
                        {order.shippingAddress.phone}{" "}
                      </td>
                      <td className="fw-bold ps-3 pe-3">
                        {order.shippingAddress.city}{" "}
                      </td>
                      <td className="fw-bold me-5 ps-2">{order.user.email} </td>
                      <td className="fw-bold text-primary ps-5">
                        {order.paymentMethodType}{" "}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            );
          })}
        </table>
      </div>
    </div>
  );
}
