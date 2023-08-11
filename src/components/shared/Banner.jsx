import React from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import Countdown from 'react-countdown';
import cardPay from "../../assets/bannerImages/cardPay.jpg";
import fashion from "../../assets/bannerImages/fashion.jpg";
import food from "../../assets/bannerImages/food.jpg";
import furniture from "../../assets/bannerImages/furniture.jpg";
import laptop from "../../assets/bannerImages/laptop.jpg";
import mobile from "../../assets/bannerImages/mobile.jpg";
import technology from "../../assets/bannerImages/technology.jpg";
import vegitable from "../../assets/bannerImages/vegitable.jpg";
import brandLogo1 from "../../assets/bannerImages/brandLogo1.png";
import brandLogo2 from "../../assets/bannerImages/brandLogo2.png";

const imageSlides = [
  { src: cardPay, alt: "Card Payment", caption: "Convenient Card Payments" },
  { src: fashion, alt: "Fashion", caption: "Discover Latest Fashion Trends" },
  { src: food, alt: "Food", caption: "Explore Delicious Food Choices" },
  { src: furniture, alt: "Furniture", caption: "Elegant Furniture Designs" },
  { src: laptop, alt: "Laptop", caption: "High-Performance Laptops" },
  { src: mobile, alt: "Mobile", caption: "Top-notch Mobile Devices" },
  { src: technology, alt: "Technology", caption: "Cutting-edge Technology" },
  { src: vegitable, alt: "Vegitable", caption: "Fresh and Healthy Vegetables" },
];

const brandLogos = [brandLogo1, brandLogo2];

const CountdownCard = ({ value, label }) => {
  return (
    <div className="text-center p-2 border border-gray-300 rounded-lg shadow-md bg-white">
      <h2 className="text-lg font-semibold mb-1">{value}</h2>
      <p className="text-gray-600 text-sm">{label}</p>
    </div>
  );
};

const CampaignCard = ({ brandLogo, name, targetDate }) => {
  return (
    <div className="flex flex-col items-center p-4 border border-gray-300 rounded-lg shadow-md bg-white mb-4 w-full">
      <img src={brandLogo} alt={name} className="w-16 h-16 mb-3" />
      <h2 className="text-lg font-semibold mb-2">{name}</h2>
      <p className="text-gray-600 mb-1">Campaign starts in:</p>
      <Countdown
        date={targetDate}
        daysInHours={false}
        renderer={({ days, hours, minutes, seconds }) => (
          <div className="flex justify-center items-center space-x-2">
            <CountdownCard value={days} label="Days" />
            <CountdownCard value={hours} label="Hours" />
            <CountdownCard value={minutes} label="Minutes" />
            <CountdownCard value={seconds} label="Seconds" />
          </div>
        )}
      />
    </div>
  );
};

const BannerCarousel = () => {
  const upcomingCampaignDates = [
    new Date("2023-12-31T23:59:59").getTime(),
    new Date("2023-12-15T23:59:59").getTime(),
  ];

  return (
    <div className="flex flex-col-reverse lg:flex-row items-center lg:justify-center mt-4 bg-gradient-to-r from-blue-200 to-purple-200">
      <div className="lg:w-1/3 p-4 lg:mr-6 space-y-4">
      <h2 className="text-xl font-semibold mb-4">Upcoming Campaigns</h2>
        {upcomingCampaignDates.map((date, index) => {
          const timeRemaining = date - Date.now();
          const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
          const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
          const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

          return (
            <CampaignCard
              key={index}
              brandLogo={brandLogos[index]}
              name={`Campaign ${index + 1}`}
              targetDate={date}
            />
          );
        })}
      </div>
      <div className="lg:w-2/3">
        <Carousel
          autoPlay
          infiniteLoop
          showArrows={true}
          showStatus={true}
          showThumbs={false}
          interval={5000}
        >
          {imageSlides.map((slide, index) => (
            <div key={index} className="relative">
              <img src={slide.src} alt={slide.alt} className="w-full h-auto" />
              <p className="legend absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-center py-1">
                {slide.caption}
              </p>
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default BannerCarousel;
