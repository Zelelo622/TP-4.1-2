// import React from 'react';

// const ProductCard = ({ products }) => {

//     const handleAddToCart = (product) => {
//         const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
//         cartItems.push(product);
//         localStorage.setItem('cartItems', JSON.stringify(cartItems));
//     };

//     return (
//         <div className='product-card'>
//             <ul className='product-list'>
//                 {products.map(product => (
//                     <li className='product-item' key={product.id}>
//                         <img style={{ width: 150 }} className='product-image' src={process.env.REACT_APP_API_URL + product.img} alt={product.name} />
//                         <h3 className='product-name'>{product.name}</h3>
//                         <p className='product-price'>{product.price}</p>
//                         <button className='product-button' onClick={() => handleAddToCart(product)}></button>
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     );
// };

// export default ProductCard;
import React from "react";

const ProductCard = ({ product }) => {
  const handleAddToCart = (product) => {
    const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    cartItems.push(product);
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  };

  return (
    <li className="product-item">
      <img
        className="product-image"
        src={process.env.REACT_APP_API_URL + product.img}
        alt={product.name}
      />
      <h3 className="product-name">{product.name}</h3>
      <div className="product-basket">
        <p className="product-price">{product.price}</p>
        <button
          className="product-button"
          onClick={() => handleAddToCart(product)}
        ></button>
      </div>
    </li>
  );
};
export default ProductCard;
