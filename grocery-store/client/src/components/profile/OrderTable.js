import React from "react";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import moment from "moment";
import { HISTORY_ORDER } from "../../utils/consts";
import "../../assets/styles/Tables.css";

const OrderTable = ({ orders }) => {
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
          {orders.map((order, index) => (
            <tr key={order.id} className="table-order__row">
              <td className="table-order__data">{index + 1}</td>
              <td className="table-order__data">
                <Link
                  to={HISTORY_ORDER + "/" + order.id}
                  className="table-order__link"
                >
                  Посмотреть список
                </Link>
              </td>
              <td className="table-order__data table-order__data--address">{order.address}</td>
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
};

export default OrderTable;
