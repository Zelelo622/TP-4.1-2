import React from "react";
import { PRODUCT } from "../../utils/consts";
import { Link } from "react-router-dom";

const ProductOrderItem = ({ product }) => {
  return (
    <div className="cart-item">
      <Link to={PRODUCT + "/" + product.name}>
        <img
          className="cart-item__img"
          src={process.env.REACT_APP_API_URL + product.product.img}
          alt={product.product.name}
        />
      </Link>
      <div className="cart-item__content">
        <h3 className="cart-item__name">{product.product.name}</h3>
        <div className="cart-item__addition">
          <div className="cart-item__quantity">
            <div className="cart-item-quant">
              <div className="cart-item-quant-inner">
                <span>{product.quantity} шт.</span>
              </div>
            </div>
          </div>
          <div className="cart-item__text">
            {(product.product.price * product.quantity).toFixed(2)} ₽
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductOrderItem;
