import React, { useEffect } from "react";
import { Table, Tooltip, OverlayTrigger, Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import moment from "moment";
import { PRODUCT_ORDER } from "../../utils/consts";
import { observer } from "mobx-react-lite";
import { updateCourier, updateStatus } from "../../http/orderAPI";
import "../../assets/styles/Tables.css";

const OrderTable = observer(
  ({
    order,
    onViewProductsClick,
    showAdminColumn,
    showCourierColumn,
    couriers,
  }) => {
    const startIndex = (order.page - 1) * order.limit;

    const handleCourierChange = async (orderId, courierId) => {
      try {
        await updateCourier(orderId, courierId);
        const updatedOrder = order.orders.find((o) => o.id === orderId);
        updatedOrder.courier_id = courierId;
        window.location.reload();
      } catch (e) {
        console.error(e.response.data.message);
      }
    };

    const handleCancelCourier = async (orderId) => {
      try {
        await updateCourier(orderId, null);
        const updatedOrder = order.orders.find((o) => o.id === orderId);
        updatedOrder.courier_id = null;
        window.location.reload();
      } catch (e) {
        console.error(e.response.data.message);
      }
    };

    const updateOrderStatus = async (orderId) => {
      try {
        await updateStatus(orderId, "В пути");
        localStorage.setItem("selectedOrderId", orderId);
        window.location.reload();
      } catch (e) {
        console.error(e.response.data.message);
      }
    };

    const handleCompleteOrder = async (orderId) => {
      try {
        await updateStatus(orderId, "Завершен");
        localStorage.removeItem("selectedOrderId");
        window.location.reload();
      } catch (e) {
        console.error(e.response.data.message);
      }
    };

    const renderTableRows = () => {
      return order.orders.map((orderItem, index) => (
        <tr key={orderItem.id} className="table-order__row">
          <td className="table-order__data">{startIndex + index + 1}</td>
          <td className="table-order__data">
            <Link
              to={PRODUCT_ORDER + "/" + orderItem.id}
              className="table-order__link"
              onClick={() => onViewProductsClick(orderItem.id)}
            >
              Посмотреть список
            </Link>
          </td>
          <td className="table-order__data table-order__data--address">
            <OverlayTrigger
              trigger="click"
              placement="top"
              overlay={<Tooltip>{orderItem.address}</Tooltip>}
            >
              <span>{orderItem.address}</span>
            </OverlayTrigger>
          </td>
          <td className="table-order__data">
            {moment(orderItem.createdAt).format("DD.MM.YY HH:mm")}
          </td>
          <td className="table-order__data">{orderItem.amount.toFixed(2)} ₽</td>
          {showCourierColumn && orderItem.courier_id ? (
            <td className="table-order__data">
              {orderItem.status === "Завершен" ? (
                <span>Завершен</span>
              ) : (
                <Button
                  variant="success"
                  size="sm"
                  onClick={() => updateOrderStatus(orderItem.id)}
                >
                  Взять
                </Button>
              )}
            </td>
          ) : (
            <td className="table-order__data">{orderItem.status}</td>
          )}
          {showAdminColumn && (
            <>
              <td className="table-order__data">
                {orderItem.courier_id || orderItem.status === "Завершен" ? (
                  <span>
                    {(() => {
                      const foundCourier = couriers.find(
                        (c) => c.id === orderItem.courier_id
                      );
                      return foundCourier
                        ? `${foundCourier.second_name} ${foundCourier.first_name}`
                        : "";
                    })()}
                  </span>
                ) : (
                  <Form.Select
                    className="table-order__courier-select"
                    value={orderItem.courier_id || ""}
                    onChange={(e) =>
                      handleCourierChange(orderItem.id, e.target.value)
                    }
                  >
                    <option value="">Выберите курьера</option>
                    {couriers.map((courier) => (
                      <option key={courier.id} value={courier.id}>
                        {courier.second_name} {courier.first_name}
                      </option>
                    ))}
                  </Form.Select>
                )}
              </td>
              <td className="table-order__data">
                {orderItem.courier_id && orderItem.status !== "Завершен" ? (
                  <Button
                    variant="danger"
                    size="sm"
                    className="table-order__cancel-button"
                    onClick={() => handleCancelCourier(orderItem.id)}
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
      ));
    };

    const renderOrderInfo = () => {
      const selectedOrderId = parseInt(
        localStorage.getItem("selectedOrderId"),
        10
      );
      const selectedOrder = order.orders.find((o) => o.id === selectedOrderId);

      return (
        <div>
          <h2>Информация о заказе</h2>
          {selectedOrder && (
            <div>
              <p>Адрес: {selectedOrder.address}</p>
              <p>
                <Link
                  to={PRODUCT_ORDER + "/" + selectedOrder.id}
                  className="table-order__link"
                  onClick={() => onViewProductsClick(selectedOrder.id)}
                >
                  Посмотреть список
                </Link>
              </p>
              <p>Дата: {moment(selectedOrder.createdAt).format("DD.MM.YY HH:mm")}</p>
              <p>Сумма: {selectedOrder.amount.toFixed(2)} ₽</p>
            </div>
          )}
          <Button
            variant="primary"
            onClick={() => handleCompleteOrder(selectedOrderId)}
          >
            Завершить заказ
          </Button>
        </div>
      );
    };

    useEffect(() => {
      const selectedOrderId = localStorage.getItem("selectedOrderId");
      if (selectedOrderId) {
        localStorage.setItem("selectedOrderId", selectedOrderId);
      } else {
        localStorage.removeItem("selectedOrderId");
      }
    }, []);

    return (
      <>
        {localStorage.getItem("selectedOrderId") ? (
          renderOrderInfo()
        ) : (
          <Table className="table-order">
            <thead>
              <tr>
                <th className="table-order__title">#</th>
                <th className="table-order__title">Товары</th>
                <th className="table-order__title">Адрес</th>
                <th className="table-order__title">Дата</th>
                <th className="table-order__title">Сумма</th>
                <th className="table-order__title">Статус</th>
                {showAdminColumn && (
                  <>
                    <th className="table-order__title">Курьеры</th>
                    <th className="table-order__title">Действия</th>
                  </>
                )}
              </tr>
            </thead>
            <tbody>{renderTableRows()}</tbody>
          </Table>
        )}
      </>
    );
  }
);

export default OrderTable;
