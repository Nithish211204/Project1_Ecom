import React from 'react';
import HomeCarousel from '../HomeCarasoul';  
import Hero from './Hero';
import Collection from './Collection';
import VegetablePage from './VegetablePage';
 // Import the CSS for Home page

const Home = () => {
//   const images = [
//     'C:\Users\cheru\NITHISH\week-1\download (1).jpg',
//     'C:\Users\cheru\NITHISH\week-1\download.jpg',
//     'C:\Users\cheru\NITHISH\week-1\images (1).jpg',
// ];

return (
    <div>
      {/* <h1>Welcome to the Legumes Page</h1> */}
      <Hero />
      <Collection />
      <VegetablePage />
      {/* <HomeCarousel /> */}
      
    </div>
);
};


export default Home;
