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
import "../assets/styles/Cart.css";
import OrderSummary from "../components/cart/OrderSummary";

const Cart = () => {
  const [cartItems, setCartItems] = useState(
    JSON.parse(localStorage.getItem("cartItems")) || []
  );
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    updateCartTotal(cartItems);
  }, [cartItems]);

  useEffect(() => {
    updateCartTotal(cartItems);
  }, [cartItems, totalQuantity, totalPrice]);

  const handleRemoveFromCart = (productId) => {
    const newCartItems = removeFromCart(cartItems, productId);
    setCartItems(newCartItems);
    updateCartTotal(newCartItems);
  };

  const handleDecrease = (productId, newQuantity) => {
    const newCartItems = decreaseProduct(cartItems, productId, newQuantity);
    setCartItems(newCartItems);
    updateCartTotal(newCartItems);
  };

  const handleIncrease = (productId, newQuantity) => {
    const newCartItems = increaseProduct(cartItems, productId, newQuantity);
    setCartItems(newCartItems);
    updateCartTotal(newCartItems);
  };

  const handleClearCart = () => {
    const newCartItems = clearCart();
    setCartItems(newCartItems);
    updateCartTotal(newCartItems);
  };

  const updateCartTotal = (cartItems) => {
    let quantity = 0;
    let price = 0;
    cartItems.forEach((item) => {
      quantity += item.quantity;
      price += item.quantity * item.price;
    });
    setTotalQuantity(quantity);
    setTotalPrice(price);
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
                {/* <div>TODO ссылк</div> */}
                <div>
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
                  <OrderSummary
                    totalQuantity={totalQuantity}
                    totalPrice={totalPrice}
                  />
                </div>
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
