import React, { useContext, useEffect, useState } from "react";
import Header from "../components/Header";
import { Container } from "react-bootstrap";
import ProfileSidebar from "../components/profile/ProfileSidebar";
import Footer from "../components/Footer";
import { fetchOneOrder } from "../http/orderAPI";
import { useParams } from "react-router-dom";
import OrderTable from "../components/profile/OrderTable";
import { observer } from "mobx-react-lite";
import { Context } from "..";
// import PageOrder from "../components/profile/PageOrder";

const HistoryOrder = observer(() => {
  const { phone } = useParams();
  const [userOrder, setUserOrder] = useState([]);
  const { order } = useContext(Context);

  useEffect(() => {
    fetchOneOrder(phone, order.page, 3).then((data) => {
      setUserOrder(data);
    });
  }, [phone, order.page]);

  return (
    <>
      <div className="container-page">
        <Header />

        <main className="main">
          <div className="profile">
            <Container>
              <div className="profile__inner">
                <ProfileSidebar />
                {userOrder && userOrder.length > 0 ? (
                  <OrderTable orders={userOrder} />
                ) : (
                  <p className="order__text">Вы не делали заказов</p>
                )}
                {/* <PageOrder /> */}
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
