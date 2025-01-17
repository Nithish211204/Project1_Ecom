import React from "react";
import "./VegetablePage.css";
import { useNavigate } from "react-router-dom";

const VegetablePage = () => {
  const navigate = useNavigate();
  const vegetables = [
    { id: 1, name: "Tomato", price: "₹50", image: "/src/assets/tomato.jpg" },
    { id: 2, name: "Brinjal", price: "₹50", image: "/src/assets/brinjal.jpg" },
    { id: 3, name: "Capsicum", price: "₹50", image: "/src/assets/capsicam.jpg" },
    { id: 4, name: "Carrot", price: "₹50", image: "/src/assets/Carrot.jpeg" },
  ];
  const goToProducts = () => {
    navigate("/product");
};

  return (
    <section className="vegetables-collection">
      <h1>Collections of Vegetables</h1>
      <div className="vegetables-grid">
        {vegetables.map((veg) => (
          <div key={veg.id} className="vegetable-card">
            <img src={veg.image} alt={veg.name} />
            <h2>{veg.name}</h2>
            <p>{veg.price}</p>
            <button>Add to Cart</button>
          </div>
        ))}
      </div>
      <button className="view-more" onClick={goToProducts}>View More</button>
    </section>
  );
};

export default VegetablePage;
