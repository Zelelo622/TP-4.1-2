import React, { useState } from "react";
import CrossSvg from "../../assets/img/icon/cross.svg";

const CartItem = ({
  product,
  removeFromCart,
  decreaseProduct,
  increaseProduct,
}) => {
  const [quantity, setQuantity] = useState(product.quantity);

  const handleDecrease = () => {
    const newQuantity = quantity - 1;
    setQuantity(newQuantity);
    decreaseProduct(product.id, newQuantity);
  };

  const handleIncrease = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    increaseProduct(product.id, newQuantity);
  };

  // Удаление товара из корзины
  const handleRemove = () => {
    removeFromCart(product.id);
  };

  return (
    <div className="cart-item">
      <img
        className="cart-item__img"
        src={process.env.REACT_APP_API_URL + product.img}
        alt={product.name}
      />
      <h3 className="cart-item__name">{product.name}</h3>
      <div className="cart-item__quantity">
        <button className="cart-item__btn btn-min" onClick={handleDecrease}>
          -
        </button>
        <span>{product.quantity} шт.</span>
        <button className="cart-item__btn btn-plus" onClick={handleIncrease}>
          +
        </button>
      </div>
      <p className="cart-item__text">{product.price} ₽</p>
      <button className="cart-item__btn-remove" onClick={handleRemove}>
        <img src={CrossSvg} alt="Удалить товар" />
      </button>
    </div>
  );
};

export default CartItem;
