import React, { useContext, useEffect, useState } from "react";
import Header from "../components/Header";
import { Container } from "react-bootstrap";
import ProfileSidebar from "../components/profile/ProfileSidebar";
import Footer from "../components/Footer";
import {
  fetchAllOrders,
  fetchOneOrder,
  fetchOrderProducts,
} from "../http/orderAPI";
import { useParams } from "react-router-dom";
import OrderTable from "../components/profile/OrderTable";
import { observer } from "mobx-react-lite";
import { Context } from "..";
import PageOrder from "../components/profile/PageOrder";
import { fetchAllCouriers } from "../http/userAPI";

const HistoryOrder = observer(() => {
  const { phone } = useParams();
  const { order, productOrder, user } = useContext(Context);
  const [showCourierColumn, setShowCourierColumn] = useState(false);
  const [couriers, setCouriers] = useState([]);

  const handleTableProductsClick = async (orderId) => {
    const products = await fetchOrderProducts(orderId);
    productOrder.setProducts(products);
  };
  
  useEffect(() => {
    const fetchOrders = async () => {
      if (user.user.role === "ADMIN") {
        const data = await fetchAllOrders(order.page, 3);
        order.setOrders(data.rows);
        order.setTotalCount(data.count);
        setShowCourierColumn(true);
      } else {
        const data = await fetchOneOrder(phone, order.page, 3);
        order.setOrders(data.rows);
        order.setTotalCount(data.count);
        setShowCourierColumn(false);
      }
    };
    fetchOrders();
  }, [phone, order.page]);

  useEffect(() => {
    const fetchCouriers = async () => {
      const response = await fetchAllCouriers();
      if (Array.isArray(response)) {
        setCouriers(response);
      }
    };
    if (showCourierColumn) {
      fetchCouriers();
    }
  }, [showCourierColumn]);

  return (
    <>
      <div className="container-page">
        <Header />

        <main className="main">
          <div className="profile">
            <Container>
              <div className="profile__inner">
                <ProfileSidebar />
                <div className="table-container">
                  {order.orders && order.orders.length > 0 ? (
                    <OrderTable
                      order={order}
                      onViewProductsClick={handleTableProductsClick}
                      showCourierColumn={showCourierColumn}
                      couriers={couriers}
                    />
                  ) : (
                    <p className="order__text">Вы не делали заказов</p>
                  )}
                  <PageOrder />
                </div>
              </div>
            </Container>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
});

export default HistoryOrder;
