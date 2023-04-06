import React, { useContext } from 'react';
import ProductCard from './ProductCard';
import { observer } from 'mobx-react-lite';
import { Context } from '../..';

const ProductList = observer(() => {
    const { product } = useContext(Context);
    return (
        <div className='product-card'>
            <ul className='product-list'>
                {product.products.map(product => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </ul>
        </div>
    );
});

export default ProductList;