import React, { useContext, useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import { fetchProductByCategory, fetchProductByName } from "../http/productAPI";
import Filter from "../components/product/Filter";
import "../assets/styles/Products.css";
import { Row, Col, Container, Spinner } from "react-bootstrap";
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
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);
  const [minCalories, setMinCalories] = useState(0);
  const [maxCalories, setMaxCalories] = useState(1000);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      async function fetchData() {
        const data = await fetchProductByName(name, filters, product.page, 12);
        setMinCalories(data.minCalories);
        setMaxCalories(data.maxCalories);
        setMinPrice(data.minPrice);
        setMaxPrice(data.maxPrice);
        product.setProducts(data.products.rows);
        product.setTotalCount(data.products.count);
      }
      fetchData();
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
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
                  <Filter
                    onFilterChange={onFilterChange}
                    minPrice={minPrice}
                    maxPrice={maxPrice}
                    minCalories={minCalories}
                    maxCalories={maxCalories}
                  />
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
