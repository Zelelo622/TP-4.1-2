import React, { useContext, useEffect, useState } from "react";
import { Context } from "../index";
import { fetchOneProduct } from "../http/productAPI";
import { useParams } from "react-router-dom";
import { observer } from "mobx-react-lite";
import ProductDetails from "../components/product/ProductDetails";

const Product = observer(() => {
  const [product, setProduct] = useState();
  const { name } = useParams();

  useEffect(() => {
    fetchOneProduct(name).then(data => setProduct(data))
  }, []);

  return (
    <div>
      <ProductDetails product={product} />
    </div>
  );
});

export default Product;