import React from 'react';

const ProductCard = ({ products }) => (
    // <div className="product-card">
    //     <img src={products.img} alt={products.name} />
    //     <h3>{products.name}</h3>
    //     <p>Price: {products.price}</p>
    //     <button>Add to Cart</button>
    // </div>

    <div className='product-card'>
        <ul className='product-list'>
            {products.map(product => (
                <li className='product-item' key={product.id}>
                    <img className='product-image' src={process.env.REACT_APP_API_URL + product.img} alt={product.name} />
                    <h3 className='product-name'>{product.name}</h3>
                    <p className='product-price'>{product.price}</p>
                    <button className='product-button'>Add to cart</button>
                </li>
            ))}
        </ul>
    </div>
);

export default ProductCard;