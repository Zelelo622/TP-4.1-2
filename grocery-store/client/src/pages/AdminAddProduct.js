import React from "react";
import Header from "../components/Header";
import { Container } from "react-bootstrap";
import Footer from "../components/Footer";
import AddProduct from "../components/adminOnly/AddProduct";

const AdminAddProduct = () => {
  return (
    <>
      <div className="container-page">
        <Header />
        <main className="main">
          <Container>
            <AddProduct />
          </Container>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default AdminAddProduct;
