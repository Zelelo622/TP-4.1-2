import React, { useState, useEffect } from "react";
import { Table, Tooltip, OverlayTrigger, Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import moment from "moment";
import { PRODUCT_ORDER } from "../../utils/consts";
import { observer } from "mobx-react-lite";
import { updateCourier } from "../../http/orderAPI";
import "../../assets/styles/Tables.css";

const OrderTable = observer(
  ({ order, onViewProductsClick, showCourierColumn, couriers }) => {
    const startIndex = (order.page - 1) * order.limit;

    const handleCourierChange = async (orderId, courierId) => {
      try {
        await updateCourier(orderId, courierId);
        const updatedOrder = order.orders.find((o) => o.id === orderId);
        updatedOrder.courier_id = courierId;
        window.location.reload();
      } catch (error) {
        console.error(error);
      }
    };

    const handleCancelCourier = async (orderId) => {
      try {
        await updateCourier(orderId, null);
        const updatedOrder = order.orders.find((o) => o.id === orderId);
        updatedOrder.courier_id = null;
        window.location.reload();
      } catch (error) {
        console.error(error);
      }
    };

    const availableCouriers = couriers.filter(
      (courier) => !order.orders.some((o) => o.courier_id === courier.id)
    );

    return (
      <>
        <Table className="table-order">
          <thead>
            <tr>
              <th className="table-order__title">#</th>
              <th className="table-order__title">Товары</th>
              <th className="table-order__title">Адрес</th>
              <th className="table-order__title">Дата</th>
              <th className="table-order__title">Сумма</th>
              <th className="table-order__title">Статус</th>
              {showCourierColumn && (
                <th className="table-order__title">Курьеры</th>
              )}
              {showCourierColumn && (
                <th className="table-order__title">Действия</th>
              )}
            </tr>
          </thead>
          <tbody>
            {order.orders.map((order, index) => (
              <tr key={order.id} className="table-order__row">
                <td className="table-order__data">{startIndex + index + 1}</td>
                <td className="table-order__data">
                  <Link
                    to={PRODUCT_ORDER + "/" + order.id}
                    className="table-order__link"
                    onClick={() => onViewProductsClick(order.id)}
                  >
                    Посмотреть список
                  </Link>
                </td>
                <td className="table-order__data table-order__data--address">
                  <OverlayTrigger
                    trigger="click"
                    placement="top"
                    overlay={<Tooltip>{order.address}</Tooltip>}
                  >
                    <span>{order.address}</span>
                  </OverlayTrigger>
                </td>
                <td className="table-order__data">
                  {moment(order.createdAt).format("DD.MM.YY")}
                </td>
                <td className="table-order__data">
                  {order.amount.toFixed(2)} ₽
                </td>
                <td className="table-order__data">{order.status}</td>
                {showCourierColumn && (
                  <>
                    <td className="table-order__data">
                      {order.courier_id ? (
                        <span>
                          {(() => {
                            const foundCourier = couriers.find(
                              (c) => c.id === order.courier_id
                            );
                            return foundCourier
                              ? `${foundCourier.second_name} ${foundCourier.first_name}`
                              : "";
                          })()}
                        </span>
                      ) : (
                        <Form.Select
                          className="table-order__courier-select"
                          value={order.courier_id || ""}
                          onChange={(e) =>
                            handleCourierChange(order.id, e.target.value)
                          }
                        >
                          <option value="">Выберите курьера</option>
                          {availableCouriers.map((courier) => (
                            <option key={courier.id} value={courier.id}>
                              {courier.second_name} {courier.first_name}
                            </option>
                          ))}
                        </Form.Select>
                      )}
                    </td>
                    <td className="table-order__data">
                      {order.courier_id ? (
                        <Button
                          variant="danger"
                          size="sm"
                          className="table-order__cancel-button"
                          onClick={() => handleCancelCourier(order.id)}
                        >
                          Отменить
                        </Button>
                      ) : (
                        <></>
                      )}
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </Table>
      </>
    );
  }
);

export default OrderTable;
