import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useState } from "react";
import { Helmet } from "react-helmet";
import toast from "react-hot-toast";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import * as Yup from "yup";

const validationSchema = Yup.object({
  resetCode: Yup.string().required("Code is required"),
});

export default function ResetCode() {
  const [isButtonSpin, setIsButtonSpin] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  if (!location.state || !location.state.path) {
    return <Navigate to="/forgetpassword" />;
  }

  const sendData = async (values) => {
    setIsButtonSpin(true);
    try {
      await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",
        values
      );
      navigate("/Newpassword", { state: { path: "/ResetCode" } });
    } catch (error) {
      if (error.code === "ERR_NETWORK") {
        toast.error("Network Error");
      } else if (error.code === "ERR_BAD_REQUEST") {
        toast.error("Invalid Code or Expired");
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
        <title>Resetpassword</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      <div className="row h-100 align-items-center">
        <div className="col-md-6 offset-md-3">
          <div className="card">
            <div className="card-body">
              <h3 className="text-center">Reset Code</h3>
              <Formik
                initialValues={{ resetCode: "" }}
                validationSchema={validationSchema}
                onSubmit={(values) => sendData(values)}
              >
                <Form>
                  <label htmlFor="resetCode" className="mt-3">
                    Reset Code:
                  </label>
                  <Field
                    type="text"
                    className="form-control"
                    name="resetCode"
                  />
                  <ErrorMessage
                    name="resetCode"
                    component="div"
                    className="alert alert-danger mt-2"
                  />

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
