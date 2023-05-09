import React from "react";
import ProductOrderItem from "./ProductOrderItem";

const ProductOrderList = ({ products }) => {
  return (
    <div className="cart__list">
      {products.map((product) => (
        <ProductOrderItem
          key={product.product.id}
          product={product}
        />
      ))}
    </div>
  );
};

export default ProductOrderList;
