import React from "react";
import { Modal, Form, Button } from "react-bootstrap";

const PaymentModal = ({ showPaymentModal, onClose, onPaymentSubmit }) => {
  return (
    <Modal show={showPaymentModal} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Оплата картой</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formCardNumber">
            <Form.Label>Номер карты</Form.Label>
            <Form.Control type="text" placeholder="Введите номер карты" />
          </Form.Group>{" "}
          <Form.Group controlId="formExpirationDate">
            <Form.Label>Срок действия</Form.Label>
            <Form.Control type="text" placeholder="Введите срок действия" />
          </Form.Group>
          <Form.Group controlId="formCVV">
            <Form.Label>CVV</Form.Label>
            <Form.Control type="text" placeholder="Введите CVV" />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Закрыть
        </Button>
        <Button variant="primary" onClick={onPaymentSubmit}>
          Оплатить
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default PaymentModal;
