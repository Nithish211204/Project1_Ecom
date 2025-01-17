import React from 'react';
import { useNavigate } from 'react-router-dom';
const AdminDashboard = () => {
  const navigate = useNavigate();
  const goToDelete = () => {
    navigate("/delete");
   
};
const goToAdd = () => {
  navigate("/add");
 
};
const goToVendor = () => {
  navigate("/vendor");
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
        <button  onClick={goToDelete}>
            Delete Product
        </button> 
      
      </ul>
    </nav>
  );
};

export default AdminDashboard;