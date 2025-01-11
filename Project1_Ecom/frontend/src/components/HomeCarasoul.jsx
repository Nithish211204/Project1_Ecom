import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const HomeCarasoul = () => {
  const settings = {
    dots: true,          // Show navigation dots
    infinite: true,      // Enable infinite scrolling
    speed: 500,          // Transition speed
    slidesToShow: 1,     // Number of slides to show at once
    slidesToScroll: 1,   // Number of slides to scroll at once
    autoplay: true,      // Enable auto-slide
    autoplaySpeed: 3000, // Auto-slide speed (in ms)
  };
//   const images = [
    //     'C:\Users\cheru\NITHISH\week-1\download (1).jpg',
    //     'C:\Users\cheru\NITHISH\week-1\download.jpg',
    //     'C:\Users\cheru\NITHISH\week-1\images (1).jpg',
    // ];

  const slides = [
    { id: 1, image: "https://depositphotos-blog.s3.eu-west-1.amazonaws.com/uploads/2017/07/Soothing-nature-backgrounds-2.webp" },
    { id: 2, image: "https://i0.wp.com/picjumbo.com/wp-content/uploads/beautiful-nature-mountain-scenery-with-flowers-free-photo.jpg?w=600&quality=80"},
    { id: 3, image: "https://cdn.pixabay.com/photo/2018/01/14/23/12/nature-3082832_960_720.jpg" },
  ];

  return (
    <div style={{ width: "55%", margin: "0 auto" }}>
      <Slider {...settings}>
        {slides.map((slide) => (
          <div key={slide.id}>
            <img
              src={slide.image}
              alt={slide.caption}
              style={{ width: "100%", height: "100%" }}
            />
            <h3 style={{ textAlign: "center" }}>{slide.caption}</h3>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default HomeCarasoul;
