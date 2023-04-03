import React from 'react';

const ProductCard = ({ products }) => (
    // <div className="product-card">
    //     <img src={products.img} alt={products.name} />
    //     <h3>{products.name}</h3>
    //     <p>Price: {products.price}</p>
    //     <button>Add to Cart</button>
    // </div>

    <ul>
        {products.map(product => (
            <li key={product.id}>
                <img style={{ width: '150px' }} src={process.env.REACT_APP_API_URL + product.img} alt={product.name} />
                <h3>{product.name}</h3>
                <p>{product.price}</p>
                <button>Add to cart</button>
            </li>
        ))}
    </ul>
);

export default ProductCard;