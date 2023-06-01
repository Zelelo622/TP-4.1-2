import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { PRODUCT } from "../../utils/consts";
import { addToCart } from "../../utils/cartUtils";
import { observer } from "mobx-react-lite";
import { Context } from "../..";

const ProductCard = observer(({ productItem }) => {
  const { user, product } = useContext(Context);

  const handleAddToCart = (productItem) => {
    addToCart(productItem);
    const totalQuantity = Number(localStorage.getItem("totalQuantity")) || 0;
    product.setTotalQuantity(totalQuantity);
  };

  const isAdminOrCourier =
    user.user.role === "ADMIN" || user.user.role === "COURIER";

  return (
    <Link to={PRODUCT + "/" + productItem.name}>
      <li className="product-item">
        {/* <div className="product-container"> */}
        <img
          className="product-card-image"
          src={process.env.REACT_APP_API_URL + productItem.img}
          alt={productItem.name}
        />
        <div className="product-details">
          <div className="product-name-container">
            <h3 className="product-name">{productItem.name}</h3>
          </div>
          <div className="product-basket">
            <p className="product-price">{productItem.price.toLocaleString()}</p>
            {!isAdminOrCourier && (
              <button
                className="product-button"
                onClick={(e) => {
                  e.preventDefault();
                  handleAddToCart(productItem);
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
