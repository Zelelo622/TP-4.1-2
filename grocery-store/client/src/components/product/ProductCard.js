import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { PRODUCT } from "../../utils/consts";
import { handleAddToCart } from "../../utils/cartUtils";
import { observer } from "mobx-react-lite";
import { Context } from "../..";

const ProductCard = observer(({ product }) => {
  const { user } = useContext(Context);

  const isAdminOrCourier = user.user.role === "ADMIN" || user.user.role === "COURIER";

  return (
    <Link to={PRODUCT + "/" + product.name}>
      <li className="product-item">
        {/* <div className="product-container"> */}
        <img
          className="product-card-image"
          src={process.env.REACT_APP_API_URL + product.img}
          alt={product.name}
        />
        <div className="product-details">
          <div className="product-name-container">
            <h3 className="product-name">{product.name}</h3>
          </div>
          <div className="product-basket">
            <p className="product-price">{product.price.toLocaleString()}</p>
            {!isAdminOrCourier && (
              <button
                className="product-button"
                onClick={(e) => {
                  e.preventDefault();
                  handleAddToCart(product);
                }}
              ></button>
            )}
          </div>
        </div>
        {/* </div> */}
      </li>
    </Link>
  );
});
export default ProductCard;
