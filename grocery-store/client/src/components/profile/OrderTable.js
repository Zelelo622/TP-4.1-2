import React from "react";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import moment from "moment";

const OrderTable = ({ orders }) => {
  return (
    <Table className="table-order">
      <thead>
        <tr>
          <th className="table-order__title">Товары</th>
          <th className="table-order__title">Адрес</th>
          <th className="table-order__title">Дата</th>
          <th className="table-order__title">Сумма</th>
          <th className="table-order__title">Статус</th>
        </tr>
      </thead>
      <tbody>
        {orders.map((order) => (
          <tr key={order.id}>
            <td className="table-order__data">
              <Link to={`/orders/${order.id}`} className="table-order__link">Посмотреть список</Link>
            </td>
            <td className="table-order__data">{order.address}</td>
            <td className="table-order__data">{moment(order.createdAt).format('DD.MM.YY')}</td>
            <td className="table-order__data">{order.amount}</td>
            <td className="table-order__data">{order.status}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default OrderTable;
