import React from "react";
import { Table, Tooltip, OverlayTrigger } from "react-bootstrap";
import { Link } from "react-router-dom";
import moment from "moment";
import { PRODUCT_ORDER } from "../../utils/consts";
import "../../assets/styles/Tables.css";
import { observer } from "mobx-react-lite";

const OrderTable = observer(({ order, onViewProductsClick }) => {

  const startIndex = (order.page - 1) * order.limit;

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
              <td className="table-order__data">{order.amount.toFixed(2)} ₽</td>
              <td className="table-order__data">{order.status}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
});

export default OrderTable;
