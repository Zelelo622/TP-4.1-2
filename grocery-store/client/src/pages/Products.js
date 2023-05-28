import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import { fetchProductByCategory } from "../http/productAPI";
import Filter from "../components/product/Filter";
import "../assets/styles/Products.css";
import { Row, Container, Spinner } from "react-bootstrap";
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
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);
  const [minCalories, setMinCalories] = useState(0);
  const [maxCalories, setMaxCalories] = useState(1000);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    category.setCategoryId(null);
    try {
      const data = await fetchProductByCategory(
        categoryId,
        filters,
        product.page,
        12
      );
      setMinCalories(data.minCalories);
      setMaxCalories(data.maxCalories);
      setMinPrice(data.minPrice);
      setMaxPrice(data.maxPrice);
      product.setProducts(data.products.rows);
      product.setTotalCount(data.products.count);
      category.setCategoryId(categoryId);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchProducts();
  }, [categoryId, filters, product.page]);
  

  useEffect(() => {
    return () => {
      product.setPage(1);
    };
  }, []);

  const onFilterChange = (newFilters) => {
    setFilters(newFilters);
    product.setPage(1);
  };

  if (loading) {
    return <Spinner animation={"grow"} />
  }

  return (
    <>
      <div className="container-page">
        <Header />
        <main className="main">
          <Container>
            <Row>
              <div className="products">
                <div>
                  <Filter onFilterChange={onFilterChange} minPrice={minPrice} maxPrice={maxPrice} minCalories={minCalories} maxCalories={maxCalories} />
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
