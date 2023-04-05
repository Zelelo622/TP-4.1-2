import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProductCard from '../components/product/ProductCard';
import { observer } from 'mobx-react-lite';
import { Context } from '../index';
import { fetchProductByCategory } from '../http/productAPI';
import Filter from '../components/product/Filter';

const ProductPage = observer(() => {
    const { product } = useContext(Context);
    const { categoryId } = useParams();
    const [filters, setFilters] = useState({
        priceRange: '',
        isVegetarian: false,
        calRange: '',
    });
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await fetchProductByCategory(categoryId, filters);
                product.setProducts(data);
            } catch (e) {
                console.error(e);
            }
        };
        fetchProducts();
    }, [categoryId, filters]);

    const onFilterChange = (newFilters) => {
        setFilters(newFilters);
    };

    return (
        <>
            <div className='container-page'>
                <Header />
                <main className='main'>
                    <Filter onFilterChange={onFilterChange} />
                    <ProductCard products={product.products} />
                </main>
                <Footer />
            </div>
        </>
    );
});

export default ProductPage;