import React, { useEffect, useState } from "react";
import { fetchOneProduct } from "../http/productAPI";
import { useParams } from "react-router-dom";
import ProductDetails from "../components/product/ProductDetails";
import Header from "../components/Header";
import { Container, Spinner } from "react-bootstrap";
import Footer from "../components/Footer";

const Product = () => {
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);
  const { name } = useParams();

  useEffect(() => {
    fetchOneProduct(name).then((data) => {
      setProduct(data);
      setLoading(false);
    });
  }, [name]);

  return (
    <>
      <div className="container-page">
        <Header />
        <main className="main">
          <Container>
            {loading ? (
              <div><Spinner animation={"grow"} /></div>
            ) : (
              <ProductDetails productItem={product} />
            )}
          </Container>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Product;
