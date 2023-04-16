import React from "react";

const OrderSummary = ({ totalQuantity, totalPrice }) => {

  return (
    <div className="order-summary">
      <div className="order-summary__item">
        <div className="order-summary__title">Количество товаров:</div>
        <div className="order-summary__value">{totalQuantity}</div>
      </div>
      <div className="order-summary__item">
        <div className="order-summary__title">Итого:</div>
        <div className="order-summary__value">{totalPrice.toFixed(2)} ₽</div>
      </div>
      <button className="order-summary__button button">Продолжить оформление</button>
    </div>
  );
};

export default OrderSummary;
