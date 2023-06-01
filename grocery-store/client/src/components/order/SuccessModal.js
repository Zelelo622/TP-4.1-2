import React, { useContext } from "react";
import { Modal, Button } from "react-bootstrap";
import { HISTORY_ORDER } from "../../utils/consts";
import { Context } from "../..";
import { observer } from "mobx-react-lite";

const SuccessModal = observer(
  ({ showSuccessModal, onClose, address, paymentMethod }) => {
    const { user } = useContext(Context);
    return (
      <Modal show={showSuccessModal} onHide={onClose}>
        <Modal.Header closeButton>
          <Modal.Title>Заказ оформлен</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Адрес доставки: {address}</p>
          <p>
            Способ оплаты: {paymentMethod === "cash" ? "Наличные" : "Карта"}
          </p>
          <p>Статус заказа: Ожидает подтверждения</p>
        </Modal.Body>
        <Modal.Footer>
          <a href={HISTORY_ORDER + `/${user.user.phone}`}>
            <Button variant="primary" onClick={onClose}>
              К заказам
            </Button>
          </a>
        </Modal.Footer>
      </Modal>
    );
  }
);

export default SuccessModal;
