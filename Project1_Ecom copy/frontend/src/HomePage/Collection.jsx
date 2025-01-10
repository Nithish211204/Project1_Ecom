import React from "react";
import "./Collection.css";

const Collection = () => {
  const collections = [
    { title: "Vegetables", img: "./src/assets/vegetables.jpg" },
    { title: "Fruits", img: "./src/assets/fruits.jpg" },
    { title: "Groceries", img: "./src/assets/groceries.jpg" },
  ];

  return (
    <section className="collections">
      <div className="collections-header">
        <h2>Explore Our Collections</h2>
        <p>Find Your Favorites From Our Wide Range of Categories</p>
      </div>
      <div className="collections-grid">
        {collections.map((collection, index) => (
          <div className="collection-card" key={index}>
            <img src={collection.img} alt={collection.title} />
            <h3>{collection.title}</h3>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Collection;
