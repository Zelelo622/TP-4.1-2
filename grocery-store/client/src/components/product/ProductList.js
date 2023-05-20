import React, { useContext } from "react";
import ProductCard from "./ProductCard";
import { observer } from "mobx-react-lite";
import { Context } from "../..";

const ProductList = observer(() => {
  const { product } = useContext(Context);
  return (
    <ul className="product-list">
      {product.products.map((product) => (
        <ProductCard key={product.id} productItem={product} />
      ))}
    </ul>
  );
});

export default ProductList;
