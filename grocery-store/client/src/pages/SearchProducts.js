import React, { useContext, useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import { fetchProductByCategory, fetchProductByName } from "../http/productAPI";
import Filter from "../components/product/Filter";
import "../assets/styles/Products.css";
import { Row, Col, Container } from "react-bootstrap";
import ProductList from "../components/product/ProductList";
import PagesProduct from "../components/product/PagesProduct";

const SearchProducts = observer(() => {
  const { product } = useContext(Context);
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const name = searchParams.get("name");
  const [filters, setFilters] = useState({
    priceRange: "",
    isVegetarian: false,
    calRange: "",
  });

  useEffect(() => {
    async function fetchData() {
      const data = await fetchProductByName(name, filters, product.page, 12);
      product.setProducts(data.products.rows);
      product.setTotalCount(data.products.count);
    }
    fetchData();
  }, [name, filters]);

  useEffect(() => {
    return () => {
      product.setPage(1);
    };
  }, []);

  const onFilterChange = (newFilters) => {
    setFilters(newFilters);
    product.setPage(1);
  };

  return (
    <>
      <div className="container-page">
        <Header />
        <main className="main">
          <Container>
            <Row>
              <div className="products">
                <div>
                  <Filter onFilterChange={onFilterChange} />
                </div>
                <div>
                  <ProductList />
                  <PagesProduct />
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

export default SearchProducts;
