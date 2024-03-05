import axios from "axios";
import React, { useEffect, useState } from "react";
import Slider from "react-slick";

export default function Categoriesslider() {
  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 8,
    slidesToScroll: 1,
  };
  const [cate, setcate] = useState([]);
  async function categories() {
    let { data } = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/categories`
    );
    setcate(data.data);
  }
  useEffect(() => {
    categories();
  }, []);
  return (
    <>
      <div className="container my-5">
        <h2>Shoo popular Categories</h2>
        <Slider {...settings}>
          {cate.map((cate) => (
            <div className="items px-2" key={cate}>
              <img src={cate.image} height={200} className="w-100" alt="" />
              <h6>{cate.name}</h6>
            </div>
          ))}
        </Slider>
      </div>
    </>
  );
}
