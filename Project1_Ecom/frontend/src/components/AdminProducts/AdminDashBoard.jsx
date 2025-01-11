import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
const AdminDashboard = () => {
  const navigate = useNavigate();
  const goToDelete = () => {
    navigate("/delete");
   
};
const goToAdd = () => {
  navigate("/add");
 
};
  // console.log(token);
  return (
    <nav >
      <ul >
      <button  onClick={goToDelete}>
            Delete Product
        </button>
        <button  onClick={goToAdd}>
                Add Product
            </button>   
        {/* <li><Link to="/add">Add Products</Link></li>
        <li><Link to="/delete">Delete Product</Link></li> */}
      </ul>
    </nav>
  );
};

export default AdminDashboard;