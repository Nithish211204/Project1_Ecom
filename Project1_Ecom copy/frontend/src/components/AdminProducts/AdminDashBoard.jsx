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
const goToAllOrder = () => {
  navigate("/allorder");
};
  // console.log(token);
  return (
    <nav >
      <ul >
      <button  onClick={goToDelete}>
            Delete Product
        </button>
        <button  onClick={goToAllOrder}>
            All Orders
        </button>
        <button  onClick={goToAdd}>
                Add Product
            </button>  
        <button  onClick={goToVendor}>
           Add Vendor
        </button> 
      
      </ul>
    </nav>
  );
};

export default AdminDashboard;