import React, { useState } from "react";

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
        className="cart-img"
        src={process.env.REACT_APP_API_URL + product.img}
        alt={product.name}
      />
      <h3 className="cart-title">{product.name}</h3>
      <p className="cart-text">Цена: {product.price} ₽</p>
      <button onClick={handleRemove}>Удалить товар</button>
      <div className="cart-quantity">
        <button className="cart-quan-btn" onClick={handleDecrease}>
          -
        </button>
        <span>{product.quantity}</span>
        <button className="cart-quan-btn" onClick={handleIncrease}>
          +
        </button>
      </div>
    </div>
  );
};

export default CartItem;
