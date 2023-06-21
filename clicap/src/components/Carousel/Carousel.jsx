import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import gallery1 from "../../assets/gallery/1.PNG";
import gallery2 from "../../assets/gallery/2.JPG";
import gallery3 from "../../assets/gallery/3.JPG";
// import gallery4 from "../../assets/gallery/4.JPG";
import gallery5 from "../../assets/gallery/5.JPG";
import gallery6 from "../../assets/gallery/6.JPG";
import gallery7 from "../../assets/gallery/7.JPG";
import gallery8 from "../../assets/gallery/8.JPG";
import "./Carousel.css";

const Carousel = () => {
  const photos = [
    gallery1,
    gallery2,
    gallery3,
    // gallery4,
    gallery5,
    gallery6,
    gallery7,
    gallery8,
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <>
      <Slider {...settings}>
        {photos.map((photo, index) => (
          <div key={index}>
            <img
              src={photo}
              alt={`Photo ${index + 1}`}
              className="carouselBox"
            />
          </div>
        ))}
      </Slider>
    </>
  );
};

export default Carousel;
