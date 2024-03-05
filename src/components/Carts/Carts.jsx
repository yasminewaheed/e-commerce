import React, { useContext, useState } from "react";
import { UserContext } from "../Context/UserContext";
import img4 from "../../assets/preview.png";
import {
  UseCard1,
  Usecard,
  checkout,
  deletcard,
  getcard,
  updatacard,
} from "../Usecart";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

export default function Cart() {
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
    <>
      <aside
        className="right"
        style={
          isopen
            ? { right: 0, transition: "right 1s" }
            : { right: "-100%", transition: "right 1s" }
        }
      >
        <i
          className="fa-solid fa-close p-3 fa-2x cursor-pointer"
          onClick={() => setisopen(false)}
        ></i>
        <div className="container">
          <Helmet>
            <meta charSet="utf-8" />
            <title>Carts</title>
            <link rel="canonical" href="http://mysite.com/example" />
          </Helmet>
          {data?.data.numOfCartItems ? (
            <>
              <h3 className="text-main">
                Number of Card Items:{data?.data.numOfCartItems}
              </h3>
              <p>
                {" "}
                <span className="fw-bolder">
                  Total Card Price : {data?.data?.data?.totalCartPrice}
                </span>
              </p>
              {data?.data?.data?.products.map((prod) => (
                <div className="row gy-2 justify-content-between align-items-center mb-2">
                  <div className="col-md-8">
                    <div className="row gy-3">
                      <div className="col-md-2">
                        <img
                          src={prod.product.imageCover}
                          alt=""
                          className="w-100"
                        />
                      </div>
                      <div className="col-md-10">
                        <p className="fw-bolder">{prod.product.title}</p>
                        <p className="text-main">{prod.price} EGP</p>
                        <p
                          className="cursor-pointer text-danger"
                          onClick={() => {
                            mutate(prod.product._id);
                          }}
                        >
                          <i className="fa-solid fa-trash text-danger cursor-pointer"></i>
                          remove
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4 d-flex justify-content-end align-items-center">
                    <div>
                      <button
                        className="btn p-1 btn-brd"
                        onClick={() => {
                          mutated({
                            id: prod.product._id,
                            count: prod.count + 1,
                          });
                        }}
                      >
                        +
                      </button>
                      <span className="mx-2">{prod.count}</span>
                      <button
                        className="btn p-1 btn-brd"
                        onClick={() =>
                          prod.count === 1
                            ? mutate(prod.product._id)
                            : mutated({
                                id: prod.product._id,
                                count:
                                  prod.count > 0 ? prod.count - 1 : prod.count,
                              })
                        }
                      >
                        -
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              <Link to={"/Checkout"}>
                <button
                  className="btn bg-main text-white w-100"
                  // data-bs-toggle="modal"
                  // data-bs-target="#staticBackdrop"
                >
                  Check out
                </button>
              </Link>
              <div
                class="modal"
                id="staticBackdrop"
                data-bs-backdrop="static"
                data-bs-keyboard="false"
                tabindex="-1"
                aria-labelledby="staticBackdropLabel"
                aria-hidden="true"
              >
                <div class="modal-dialog">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h1 class="modal-title fs-5" id="staticBackdropLabel">
                        Modal title
                      </h1>
                      <button
                        type="button"
                        class="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      ></button>
                    </div>
                    <div class="modal-body">
                      {" "}
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
                          className="btn btn-danger"
                          onClick={addaddress}
                        >
                          Add address
                        </button>
                      </form>
                    </div>
                    <div class="modal-footer">
                      <button
                        type="button"
                        class="btn btn-secondary"
                        data-bs-dismiss="modal"
                      >
                        Close
                      </button>
                      <button type="button" class="btn btn-primary">
                        Understood
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="text-center">
              {" "}
              <h2 className="text-main"> Card id Empty</h2>
              <img src={img4} alt="" />
            </div>
          )}
        </div>
      </aside>
    </>
  );
}
