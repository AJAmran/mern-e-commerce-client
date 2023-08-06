import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import p1 from "../../assets/images/p1.jpg";
import p2 from "../../assets/images/p2.jpg";
import p3 from "../../assets/images/p3.jpg";

function Banner() {
  const images = [p1, p2, p3];

  return (
    <div className="relative">
      <Carousel
        showStatus={true}
        showThumbs={true}
        infiniteLoop
        autoPlay
        interval={5000}
        transitionTime={1000}
        showArrows={true}
      >
        {images.map((image, index) => (
          <div key={index}>
            <img src={image} alt={`Banner ${index + 1}`} />
          </div>
        ))}
      </Carousel>
    </div>
  );
}

export default Banner;
