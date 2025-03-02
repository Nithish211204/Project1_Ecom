import React from "react";
import "./Hero.css";

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1>
          Fresh <span>Vegetables</span> Delivered <br /> to Your Doorstep!
        </h1>
        <p>
          Shop the best, freshest, and organic produce for your family.
        </p>
        <button className="hero-btn">Shop Now</button>
      </div>
      <div className="hero-image">
        <img
          src="src\assets\top-close-view-green-salad-along-withful-bell-peppers-spicy-peppers-white-desk-vegetable-food-meal-ingredient.png"
          alt="Fresh Vegetables"
        />
      </div>
    </section>
  );
};

export default Hero;
