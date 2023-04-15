import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../assets/styles/Home.css";
import { Container } from "react-bootstrap";
import {
  removeFromCart,
  clearCart,
  decreaseProduct,
  increaseProduct,
} from "../utils/cartUtils";
import CartList from "../components/cart/CartList";

const Cart = () => {
  const [cartItems, setCartItems] = useState(
    JSON.parse(localStorage.getItem("cartItems")) || []
  );

  const handleRemoveFromCart = (productId) => {
    const newCartItems = removeFromCart(cartItems, productId);
    setCartItems(newCartItems);
  };

  const handleDecrease = (productId, newQuantity) => {
    const newCartItems = decreaseProduct(cartItems, productId, newQuantity);
    setCartItems(newCartItems);
  };

  const handleIncrease = (productId, newQuantity) => {
    const newCartItems = increaseProduct(cartItems, productId, newQuantity);
    setCartItems(newCartItems);
  };

  const handleClearCart = () => {
    const newCartItems = clearCart();
    setCartItems(newCartItems);
  };

  return (
    <>
      <div className="container-page">
        <Header />

        <main className="main">
          <div className="home">
            <Container>
              <div className="cart-list">
                <h2>Коризина</h2>
                {cartItems.length === 0 ? (
                  <p>Корзина пуста</p>
                ) : (
                  <CartList
                    products={cartItems}
                    removeFromCart={handleRemoveFromCart}
                    decreaseProduct={handleDecrease}
                    increaseProduct={handleIncrease}
                  />
                )}
              </div>
            </Container>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Cart;
