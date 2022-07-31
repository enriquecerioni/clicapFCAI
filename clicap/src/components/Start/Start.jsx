import React from "react";
import firstSlide from "../../assets/slide-1.jpg"
import secondSlide from "../../assets/slide-2.jpg"
import thirdSlide from "../../assets/slide-3.jpg"
import Carousel from 'react-bootstrap/Carousel';
import "./start.scss";

const Start = () => {
  return (
    <>
    <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="true">
      <div className="carousel-indicators">
        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
      </div>
      <div className="carousel-inner">
        <div className="carousel-item active imgCarousel">
          <img src={firstSlide} className="d-block w-100 h-100" alt="..." />
        </div>
        <div className="carousel-item imgCarousel">
          <img src={secondSlide} className="d-block w-100 h-100" alt="..." />
        </div>
        <div className="carousel-item imgCarousel">
          <img src={thirdSlide} className="d-block w-100 h-100" alt="..." />
        </div>
      </div>
      <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
    </>
  );
};

export default Start;
