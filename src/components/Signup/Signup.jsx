import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
export default function Signup() {
  let navigat = useNavigate();
  const [errmass, seterrmass] = useState("");
  const [isloasing, setisloading] = useState(false);
  async function getApi(request) {
    console.log(request);
    seterrmass("");
    setisloading(true);
    let { data } = await axios
      .post(`https://ecommerce.routemisr.com/api/v1/auth/signup`, request)
      .catch((err) => {
        setisloading(false);
        seterrmass(err.response.data.message);
      });
    console.log(data);
    if (data.message === "success") {
      navigat("/");
    }
  }
  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
  const validationSchem = Yup.object({
    name: Yup.string()
      .min(3, "name is too short")
      .max(6, "name is too long")
      .required("name is required"),
    email: Yup.string()
      .email("email is Not vaild")
      .required("email is required"),
    password: Yup.string()
      .matches(/[a-zA-Z]/, "password not valid")
      .min(5, "password is too short")
      .required("password is required"),
    rePassword: Yup.string()
      .oneOf([Yup.ref("password")], "password and repassword should match")
      .required("password is required"),
    phone: Yup.string()
      .matches(phoneRegExp, "phone not valid")
      .required("phone is required"),
  });

  const registration = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    validationSchema: validationSchem,
    onSubmit: getApi,
  });
  // console.log(registration);
  console.log(registration);

  return (
    <>
      <Helmet>
        <title>SignUp</title>
        <link
          rel="apple-touch-icon"
          href="../src/images/apple-touch-icon.png"
        />
        <link rel="icon" href="../src/images/favicon.ico" />
      </Helmet>
      <div className="w-50 mx-auto my-5">
        <h2 className="mb-3">Register Now:</h2>
        {errmass ? <div className="alert alert-danger">{errmass}</div> : null}
        <form onSubmit={registration.handleSubmit}>
          <div className="form-group">
            <label htmlFor="name" className="mb-1">
              Name:
            </label>
            <input
              type="text"
              id="name"
              value={registration.values.name}
              className="form-control"
              onChange={registration.handleChange}
              onBlur={registration.handleBlur}
            ></input>
            {registration.errors.name && registration.touched.name ? (
              <div className="alert alert-danger">
                {registration.errors.name}
              </div>
            ) : null}
          </div>
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
          <div className="form-group">
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
            {registration.errors.password && registration.touched.password ? (
              <div className="alert alert-danger">
                {registration.errors.password}
              </div>
            ) : null}
          </div>
          <div className="form-group">
            <label htmlFor="rePassword" className="mb-1">
              rePassword:
            </label>
            <input
              type="password"
              id="rePassword"
              value={registration.values.rePassword}
              className="form-control"
              onChange={registration.handleChange}
              onBlur={registration.handleBlur}
            ></input>
            {registration.errors.rePassword &&
            registration.touched.rePassword ? (
              <div className="alert alert-danger">
                {registration.errors.rePassword}
              </div>
            ) : null}
          </div>
          <div className="form-group mb-2">
            <label htmlFor="phone" className="mb-1">
              phone:
            </label>
            <input
              type="number"
              id="phone"
              value={registration.values.phone}
              className="form-control"
              onChange={registration.handleChange}
              onBlur={registration.handleBlur}
            ></input>
            {registration.errors.phone && registration.touched.phone ? (
              <div className="alert alert-danger">
                {registration.errors.phone}
              </div>
            ) : null}
          </div>
          <button
            type="submit"
            disabled={!(registration.isValid && registration.dirty)}
            className="btn bg-main text-white d-block ms-auto"
          >
            {isloasing ? (
              <i className="fa fa-spinner fa-spin"></i>
            ) : (
              "  Register"
            )}
          </button>
        </form>
      </div>
    </>
  );
}
