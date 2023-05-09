import React, { useContext, useEffect, useState } from "react";
import Header from "../components/Header";
import { Container } from "react-bootstrap";
import ProfileSidebar from "../components/profile/ProfileSidebar";
import Footer from "../components/Footer";
import { fetchOneOrder, fetchOrderProducts } from "../http/orderAPI";
import { useLocation, useParams } from "react-router-dom";
import OrderTable from "../components/profile/OrderTable";
import { observer } from "mobx-react-lite";
import { Context } from "..";
import ProductOrderList from "../components/profile/ProductOrderList";

const ProductsOrder = observer(() => {
  const { productOrder } = useContext(Context);
  const { id } = useParams();

  useEffect(() => {
    const fetchProducts = async () => {
      if (id) {
        const products = await fetchOrderProducts(id);
        productOrder.setProducts(products);
      }
    };
    fetchProducts();
  }, [id]);
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
                  <ProductOrderList products={productOrder.products} />
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

export default ProductsOrder;
