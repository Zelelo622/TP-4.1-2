import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import { fetchProductByCategory } from "../http/productAPI";
import Filter from "../components/product/Filter";
import "../assets/styles/Products.css";
import { Row, Col, Container } from "react-bootstrap";
import ProductList from "../components/product/ProductList";
import Pages from "../components/product/Pages";

const ProductPage = observer(() => {
  const { product } = useContext(Context);
  const { categoryId } = useParams();
  const [filters, setFilters] = useState({
    priceRange: "",
    isVegetarian: false,
    calRange: "",
  });
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await fetchProductByCategory(
          categoryId,
          filters,
          product.page,
          12
        );
        product.setProducts(data.rows);
        product.setTotalCount(data.count);
      } catch (e) {
        console.error(e);
      }
    };
    fetchProducts();
  }, [categoryId, filters]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await fetchProductByCategory(
          categoryId,
          filters,
          product.page,
          12
        );
        product.setProducts(data.rows);
        product.setTotalCount(data.count);
      } catch (e) {
        console.error(e);
      }
    };
    fetchProducts();
  }, [product.page]);

  const onFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  return (
    <>
      <div className="container-page">
        <Header />
        <main className="main">
          <Container>
            <Row className="mt-2">
              <div className="products">
                <div>
                  <Filter onFilterChange={onFilterChange} />
                </div>
                <div>
                  <ProductList />
                  <Pages />
                </div>
              </div>
            </Row>
          </Container>
        </main>
        <Footer />
      </div>
    </>
  );
});

export default ProductPage;
