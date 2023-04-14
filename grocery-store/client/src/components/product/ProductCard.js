import React from "react";
import { Link } from "react-router-dom";
import { PRODUCT } from "../../utils/consts";
import { handleAddToCart } from "../../utils/cartUtils";

const ProductCard = ({ product }) => {

  return (
    <Link to={PRODUCT + "/" + product.name}>
      <li className="product-item">
        <div className="product-container">
          <img
            className="product-image"
            src={process.env.REACT_APP_API_URL + product.img}
            alt={product.name}
          />
          <div className="product-details">
            <h3 className="product-name">{product.name}</h3>
            <div className="product-basket">
              <p className="product-price">{product.price}</p>
              <button
                className="product-button"
                onClick={(e) => {
                  e.preventDefault();
                  handleAddToCart(product);
                }}
              ></button>
            </div>
          </div>
        </div>
      </li>
    </Link>
  );
};
export default ProductCard;
