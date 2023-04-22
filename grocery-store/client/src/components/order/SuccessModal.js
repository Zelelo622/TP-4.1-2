import React from "react";
import { Modal, Button } from "react-bootstrap";

const SuccessModal = ({
  showSuccessModal,
  onClose,
  address,
  paymentMethod,
}) => {
  return (
    <Modal show={showSuccessModal} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Заказ оформлен</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Адрес доставки: {address}</p>
        <p>Способ оплаты: {paymentMethod === "cash" ? "Наличные" : "Карта"}</p>
        <p>Статус заказа: Ожидает подтверждения</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={onClose}>
          Закрыть
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default SuccessModal;
