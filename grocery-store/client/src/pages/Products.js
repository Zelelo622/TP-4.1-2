import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProductCard from '../components/product/ProductCard';
import { observer } from 'mobx-react-lite';
import { Context } from '../index';
import { fetchProductByCategory } from '../http/categoryAPI';

const ProductPage = observer(() => {
    const { product } = useContext(Context);
    const { categoryId } = useParams();
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await fetchProductByCategory(categoryId);
                product.setProducts(data);
            } catch (e) {
                console.error(e);
            }
        };
        fetchProducts();
    }, [categoryId]);

    return (
        <>
            <div className='container-page'>
                <Header />
                <main className='main'>
                    {/* <div>
                        <div className="product-page">
                            <div className="filter">
                                <h2>Filter Products</h2>
                                <div className="filter-group">
                                    <label htmlFor="price">Price:</label>
                                    <input
                                        type="number"
                                        id="price"
                                        name="price"
                                        value={''}
                                    />
                                </div>
                                <div className="filter-group">
                                    <label htmlFor="kcal">Kcal:</label>
                                    <input
                                        type="number"
                                        id="kcal"
                                        name="kal"
                                        value={''}
                                    />
                                </div>
                                <div className="filter-group">
                                    <label htmlFor="vegetarian">Vegetarian:</label>
                                    <input
                                        type="checkbox"
                                        id="vegetarian"
                                        name="vegetarian"
                                    />
                                </div>
                                <button>Clear Filters</button>
                            </div>
                            <div className="product-list">
                                <h2>Products for Category {categoryId}</h2>
                                {product.products.map((product) => (
                                    <ProductCard key={product.id} product={product} />
                                ))}
                            </div>
                        </div> */}

                    {/* <ProductCard products={product.products} /> */}
                    {/* </div> */}
                    <ul>
                        {product.products.map((product) => (
                            <li key={product.id}>{product.name}</li>
                        ))}
                    </ul>
                </main>
                <Footer />
            </div>
        </>
    );
});

export default ProductPage;