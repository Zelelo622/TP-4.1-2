import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import { fetchProductByCategory } from "../http/productAPI";
import Filter from "../components/product/Filter";
import "../assets/styles/Products.css";
import { Row, Container } from "react-bootstrap";
import ProductList from "../components/product/ProductList";
import PagesProduct from "../components/product/PagesProduct";
import { PRODUCT_ADD } from "../utils/consts";

const Products = observer(() => {
  const { category, product, user } = useContext(Context);
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
        category.setCategoryId(categoryId);
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
        category.setCategoryId(categoryId);
      } catch (e) {
        console.error(e);
      }
    };
    fetchProducts();
  }, [product.page]);

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
                  {user.user.role === "ADMIN" && (
                    <div className="admin-btn-container">
                      <Link to={PRODUCT_ADD} className="button add-prod-btn">
                        Добавить товар
                      </Link>
                    </div>
                  )}
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

export default Products;
