import React from "react";
import Slider from "react-slick";
import img1 from "../assets/slider-image-1.jpeg";
import img2 from "../assets/slider-image-2.jpeg";
import img3 from "../assets/slider-image-3.jpeg";

export default function SimpleSlider() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <div className="container my-5">
      <div className="row">
        <div className="col-md-8">
          <Slider {...settings}>
            <img src={img3} alt="" className="w-100" />
            <img src={img2} alt="" className="w-100" />
            <img src={img1} alt="" className="w-100" />
          </Slider>
        </div>
        <div className="col-md-4">
          <img src={img1} alt="" className="w-100" />
          <img src={img2} alt="" className="w-100" />
        </div>
      </div>
    </div>
  );
}
