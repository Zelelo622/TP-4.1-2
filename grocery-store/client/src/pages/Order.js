import React, { useState, useEffect, useContext } from "react";
import Header from "../components/Header";
import { Container, Button, Form } from "react-bootstrap";
import Footer from "../components/Footer";
import PaymentModal from "../components/order/PaymentModal";
import SuccessModal from "../components/order/SuccessModal";
import { Context } from "..";
import { createOrder } from "../http/orderAPI";
import { deleteInfoCart } from "../utils/cartUtils";

const Order = () => {
  const { user } = useContext(Context);
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [orderSubmitted, setOrderSubmitted] = useState(false);

  const cartItems = JSON.parse(localStorage.getItem("cartItems"));
  const totalPrice = parseFloat(localStorage.getItem("totalPrice"));
  const totalQuantity = parseInt(localStorage.getItem("totalQuantity"));

  useEffect(() => {
    setShowSuccessModal(false);
  }, [paymentMethod]);

  const handlePaymentSubmit = () => {
    setShowPaymentModal(false);
    setShowSuccessModal(true);
  };

  const handleOrderSubmit = async () => {
    try {
      if (!paymentMethod) {
        setShowErrorMessage(true);
        return;
      }

      const newOrder = await createOrder(
        user.user.id,
        address,
        cartItems,
        totalPrice,
        totalQuantity
      );

      if (paymentMethod === "cash") {
        deleteInfoCart();
      }

      setShowSuccessModal(true);
    } catch (error) {
      console.log("Ошибка при оформлении заказа:", error.message);

      if (error.response.status === 400) {
        setShowErrorMessage(true);
      }
    }

    setOrderSubmitted(true);
  };

  // const handleOrderSubmit = () => {
  //   if (paymentMethod === "cash") {
  //     try {
  //       setShowSuccessModal(true);
  //       createOrder(user.user.id, address, cartItems, totalPrice, totalQuantity);
  //     } catch (error) {
  //       console.log("Ошибка при оформлении заказа:", error.message);
  //     }
  //     deleteInfoCart();
  //   } else if (paymentMethod === "") {
  //     setShowErrorMessage(true);
  //   } else {
  //     try {
  //       setShowSuccessModal(false);
  //       setShowPaymentModal(true);
  //       createOrder(user.id, address, cartItems, totalPrice, totalQuantity);
  //     } catch (error) {
  //       console.log("Ошибка при оформлении заказа:", error.message);
  //     }
  //     deleteInfoCart();
  //   }
  //   setOrderSubmitted(true);
  // };

  return (
    <>
      <div className="container-page">
        <Header />
        <main className="main">
          <div className="cart">
            <Container>
              <Form>
                <Form.Group controlId="formAddress">
                  <Form.Label>Адрес доставки</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Введите адрес доставки"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </Form.Group>{" "}
                <Form.Group controlId="formPaymentMethod">
                  <Form.Label>Способ оплаты</Form.Label>
                  <Form.Control
                    as="select"
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className={
                      orderSubmitted && paymentMethod === "" ? "is-invalid" : ""
                    }
                  >
                    <option value="">Выберите способ оплаты</option>
                    <option value="cash">Наличные</option>
                    <option value="card">Карта</option>
                  </Form.Control>
                </Form.Group>
                <Button variant="primary" onClick={handleOrderSubmit}>
                  Оформить заказ
                </Button>
              </Form>
              <PaymentModal
                showPaymentModal={showPaymentModal}
                onClose={() => setShowPaymentModal(false)}
                onPaymentSubmit={handlePaymentSubmit}
              />

              <SuccessModal
                showSuccessModal={showSuccessModal}
                onClose={() => setShowSuccessModal(false)}
                address={address}
                paymentMethod={paymentMethod}
              />
            </Container>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Order;
