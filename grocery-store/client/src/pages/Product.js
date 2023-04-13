import React, { useEffect, useState } from "react";
import { fetchOneProduct } from "../http/productAPI";
import { useParams } from "react-router-dom";
import ProductDetails from "../components/product/ProductDetails";
import Header from "../components/Header";
import { Container } from "react-bootstrap";
import Footer from "../components/Footer";

const Product = () => {
  const [product, setProduct] = useState({});
  const { name } = useParams();

  useEffect(() => {
    fetchOneProduct(name).then((data) => setProduct(data));
  }, []);

  return (
    <>
      <div className="container-page">
        <Header />
        <main className="main">
          <Container>
            <ProductDetails product={product} />
          </Container>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Product;
