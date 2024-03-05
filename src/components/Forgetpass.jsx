import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useState } from "react";
import { Helmet } from "react-helmet";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

const validationSchema = Yup.object({
  email: Yup.string().required("Email is required").email("Invalid email"),
});

export default function ForgetPassword() {
  const [codeSend, setCodeSend] = useState(false);
  const [emailExist, setEmailExist] = useState(true);
  const [isButtonSpin, setIsButtonSpin] = useState(false);
  const navigate = useNavigate();

  const sendData = async (values) => {
    setIsButtonSpin(true);
    try {
      await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",
        values
      );
      setCodeSend(true);
      setEmailExist(true);
      toast.success("Code Sent");
      navigate("/Resetpass", { state: { path: "/Resetpass" } });
    } catch (error) {
      if (error.code === "ERR_NETWORK") {
        toast.error("Network Error");
      } else if (error.code === "ERR_BAD_REQUEST") {
        setEmailExist(false);
      } else {
        toast.error("Error sending Code");
      }
    }
    setIsButtonSpin(false);
  };

  return (
    <div className="container" style={{ height: "70vh" }}>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Forgetpasword</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      <div className="row h-100 align-items-center">
        <div className="col-md-6 offset-md-3">
          <div className="card">
            <div className="card-body">
              <h3 className="text-center">Forget Password</h3>
              <Formik
                initialValues={{ email: "" }}
                validationSchema={validationSchema}
                onSubmit={(values) => sendData(values)}
              >
                <Form>
                  <label htmlFor="email" className="mt-3">
                    Email:
                  </label>
                  <Field type="email" className="form-control" name="email" />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="alert alert-danger mt-2"
                  />
                  {emailExist ? (
                    ""
                  ) : (
                    <div className="alert alert-danger text-center p-2 mt-2">
                      Email does not exist
                    </div>
                  )}
                  <div className="d-flex flex-row-reverse mt-3">
                    <button
                      className={`btn bg-main text-white ${
                        isButtonSpin ? "disabled" : ""
                      }`}
                      type="submit"
                    >
                      {isButtonSpin ? (
                        <span
                          className="spinner-border spinner-border-sm"
                          role="status"
                          aria-hidden="true"
                        ></span>
                      ) : (
                        "Send"
                      )}
                    </button>
                  </div>
                </Form>
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
