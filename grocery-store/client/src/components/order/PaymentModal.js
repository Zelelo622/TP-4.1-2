import React, { useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import cardValidator from "../../utils/cardValidator";

const PaymentModal = ({
  showPaymentModal,
  onClose,
  onPaymentSubmit,
  onCreateOrderRequest,
}) => {
  const [cardData, setCardData] = useState({
    cardNumber: "",
    expirationMonth: "",
    expirationYear: "",
    cvv: "",
  });
  const [errors, setErrors] = useState({});

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCardData({ ...cardData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { cardNumber, expirationMonth, expirationYear, cvv } = cardData;
    const errors = cardValidator({
      cardNumber,
      expirationMonth,
      expirationYear,
      cvv,
    });
    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }
    setErrors({});
    try {
      await onCreateOrderRequest;
      onPaymentSubmit();
      onCreateOrderRequest();
      setCardData({
        cardNumber: "",
        expirationMonth: "",
        expirationYear: "",
        cvv: "",
      });
    } catch (error) {
      console.log("Ошибка при создании заказа:", error.message);
    }
  };

  return (
    <Modal show={showPaymentModal} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Оплата картой</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formCardNumber">
            <Form.Label>Номер карты</Form.Label>
            <Form.Control
              type="numeric"
              name="cardNumber"
              placeholder="Введите номер карты"
              value={cardData.cardNumber}
              onChange={handleInputChange}
              isInvalid={!!errors.cardNumber}
              maxLength="19"
              onKeyUp={(e) => {
                const cardNumberValue = e.target.value
                  .replace(/\D/g, "")
                  .substring(0, 16);
                e.target.value =
                  cardNumberValue !== ""
                    ? cardNumberValue.match(/.{1,4}/g).join("-")
                    : "";
              }}
            />
            <Form.Control.Feedback type="invalid">
              {errors.cardNumber}
            </Form.Control.Feedback>
          </Form.Group>{" "}
          <Form.Group controlId="formExpirationDate">
            <Form.Label>Срок действия</Form.Label>
            <div className="d-flex">
              <div className="me-2">
                <Form.Control
                  type="numeric"
                  name="expirationMonth"
                  placeholder="ММ"
                  value={cardData.expirationMonth}
                  onChange={handleInputChange}
                  isInvalid={!!errors.expirationMonth}
                  maxLength="2"
                />
                <Form.Control.Feedback type="invalid">
                  {errors.expirationMonth}
                </Form.Control.Feedback>
              </div>
              <div>
                <Form.Control
                  type="numeric"
                  name="expirationYear"
                  placeholder="ГГ"
                  value={cardData.expirationYear}
                  onChange={handleInputChange}
                  isInvalid={!!errors.expirationYear}
                  maxLength="2"
                />
                <Form.Control.Feedback type="invalid">
                  {errors.expirationYear}
                </Form.Control.Feedback>
              </div>
            </div>
          </Form.Group>{" "}
          <Form.Group controlId="formCVV">
            <Form.Label>CVV</Form.Label>
            <Form.Control
              type="numeric"
              name="cvv"
              placeholder="Введите CVV"
              value={cardData.cvv}
              onChange={handleInputChange}
              isInvalid={!!errors.cvv}
              maxLength="3"
              pattern="[0-9]*"
            />
            <Form.Control.Feedback type="invalid">
              {errors.cvv}
            </Form.Control.Feedback>
          </Form.Group>{" "}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Закрыть
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Оплатить
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default PaymentModal;
