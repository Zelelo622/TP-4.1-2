import React, { useContext, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { LOGIN_ROUTE, REGISTRATION_ROUTE, ORDER } from "../../utils/consts";
import { Context } from "../..";
import { observer } from "mobx-react-lite";
import { Button, Card, Modal } from "react-bootstrap";

const OrderSummary = ({ totalQuantity, totalPrice }) => {
  const { user } = useContext(Context);
  const [showModal, setShowModal] = useState(false);

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  return (
    <div className="order-summary">
      <div className="order-summary__inner">
        <div className="order-summary__item">
          <div className="order-summary__title">Количество товаров:</div>
          <div className="order-summary__value">{totalQuantity}</div>
        </div>
        <div className="order-summary__item">
          <div className="order-summary__title">Итого:</div>
          <div className="order-summary__value">{totalPrice.toFixed(2)} ₽</div>
        </div>
        <div className="order-summary__btn-cont">
          {user.isAuth ? (
            <Link to={ORDER} className="order-summary__button button">
              Продолжить оформление
            </Link>
          ) : (
            <button
              variant="primary"
              className="order-summary__button button"
              onClick={handleShow}
            >
              Продолжить оформление
            </button>
          )}
        </div>
      </div>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Body>
          <p className="modal-title">
            Авторизуйтесь или зарегистрируйтесь, чтобы сделать заказ
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Link className="modal-link button" to={REGISTRATION_ROUTE}>Зарегистрироваться</Link>
          <Link className="modal-link modal-link-blue button" to={LOGIN_ROUTE}>Авторизоваться</Link>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default OrderSummary;
