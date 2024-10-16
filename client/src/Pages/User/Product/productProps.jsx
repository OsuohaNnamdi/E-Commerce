import React, { useState, useContext } from 'react';
import Swal from 'sweetalert2';
import { ShopContext } from '../../../Component/ShopContent/shop-context'; 

export const ProductProps = (props) => {
  const { id, Name, price, productImage } = props.data;
  const { addToCart } = useContext(ShopContext);
  const [loading, setLoading] = useState(false); // Loading state

  const handleAddToCart = async () => {
    setLoading(true); // Set loading to true when button is clicked
    await addToCart(id); // Simulate adding to cart or await async operation
    setLoading(false); // Reset loading state after the operation is done
    
    // SweetAlert for better user experience
    Swal.fire({
      title: 'Success!',
      text: `${Name} has been added to your cart!`,
      icon: 'success',
      confirmButtonText: 'OK'
    });
  };

  return (
    <div>
      <button className='bottn'>
        <img src={productImage} alt={Name}/>
      </button>

      <div className='description'>
        <p><b>{Name}</b></p>
        <p><b>₦{price}</b></p>

        <button 
          className='button' 
          onClick={handleAddToCart} 
          disabled={loading} 
        >
          {loading ? 'Adding...' : 'Add To Cart'} 
        </button>
      </div>
    </div>
  );
};
