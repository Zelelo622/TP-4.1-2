import React from "react";
import CartItem from "./CartItem";

const CartList = ({
  products,
  removeFromCart,
  decreaseProduct,
  increaseProduct,
}) => {
  return (
    <div>
      {products.map((product) => (
        <CartItem
          key={product.id}
          product={product}
          removeFromCart={removeFromCart}
          decreaseProduct={decreaseProduct}
          increaseProduct={increaseProduct}
        />
      ))}
    </div>
  );
};

export default CartList;
