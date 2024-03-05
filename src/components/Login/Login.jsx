import React, { useContext, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../Context/UserContext";
import { Helmet } from "react-helmet";

export default function Login() {
  let { setUsertoken, setlogin, setUserId } = useContext(UserContext);
  let navigat = useNavigate();
  const [errmass, seterrmass] = useState("");
  const [isloasing, setisloading] = useState(false);
  async function getApi(request) {
    console.log(request);
    seterrmass("");
    setisloading(true);
    let { data } = await axios
      .post(`https://ecommerce.routemisr.com/api/v1/auth/signin`, request)
      .catch((err) => {
        setisloading(false);
        seterrmass(err.response.data.message);
      });
    console.log(data.token);
    if (data.message === "success") {
      localStorage.setItem("userToken", data.token);
      localStorage.setItem("userName", data.user.name);
      localStorage.getItem("userId", data.id);
      setUsertoken(data.token);
      setlogin(data.user.name);
      setUserId(data.user.id);
      navigat("/Home");
    }
  }
  const validationSchem = Yup.object({
    email: Yup.string()
      .email("email is Not vaild")
      .required("email is required"),
    password: Yup.string()
      .matches(/[a-zA-Z]/, "password not valid")
      .min(5, "password is too short")
      .required("password is required"),
  });

  const registration = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchem,
    onSubmit: getApi,
  });
  // console.log(registration);
  console.log(registration);

  return (
    <>
      <div className="w-50 mx-auto my-5">
        <Helmet>
          <title>Login</title>
          <link
            rel="apple-touch-icon"
            href="../src/images/apple-touch-icon.png"
          />
          <link rel="icon" href="../src/images/favicon.ico" />
        </Helmet>
        <h2 className="mb-3">Login Now:</h2>
        {errmass ? <div className="alert alert-danger">{errmass}</div> : null}
        <form onSubmit={registration.handleSubmit}>
          <div className="form-group">
            <label htmlFor="email" className="mb-1">
              email:
            </label>
            <input
              type="email"
              id="email"
              value={registration.values.email}
              className="form-control"
              onChange={registration.handleChange}
              onBlur={registration.handleBlur}
            ></input>
            {registration.errors.email && registration.touched.email ? (
              <div className="alert alert-danger">
                {registration.errors.email}
              </div>
            ) : null}
          </div>
          <div className="form-group mb-2">
            <label htmlFor="password" className="mb-1">
              password:
            </label>
            <input
              type="password"
              id="password"
              value={registration.values.password}
              className="form-control"
              onChange={registration.handleChange}
              onBlur={registration.handleBlur}
            ></input>
            {/* <Link
              to={``}
              style={{ textDecoration: "none", textDecorationStyle: "none" }}
              className="text-black fw-bolder"
            >
              <p className="mt-3">forget Password</p>
            </Link> */}
            {registration.errors.password && registration.touched.password ? (
              <div className="alert alert-danger">
                {registration.errors.password}
              </div>
            ) : null}
          </div>
          <Link
            to={`/Forgetpass`}
            style={{ textDecoration: "none", textDecorationStyle: "none" }}
            className="text-black fw-bolder"
          >
            <p className="mt-3">forget Password?</p>
          </Link>
          <button
            style={{ marginTop: "-50px" }}
            type="submit"
            disabled={!(registration.isValid && registration.dirty)}
            className="btn bg-main text-white d-block ms-auto"
          >
            {isloasing ? <i className="fa fa-spinner fa-spin"></i> : "Login"}
          </button>
        </form>
      </div>
    </>
  );
}
