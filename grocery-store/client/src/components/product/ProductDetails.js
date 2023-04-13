import React from "react";
import "../../assets/styles/ProductDetails.css";

const ProductDetails = ({ product }) => {
  return (
    <div className="product-details-container">
      <div className="product-image">
        <img src={product.img} alt={product.name} />
      </div>
      <div className="product-info">
        <h2 className="product-title">{product.name}</h2>
        <div className="product-cart">
          <p className="product-price">{product.price} руб.</p>
          <button className="add-to-cart-btn">В корзину</button>
        </div>
        <div className="product-description">
          <div className="product-comp">
            <p className="comp-title">Состав:</p>
            <p className="comp-text">{product.composition}</p>
          </div>
          <div className="product-nutrition">
            <p className="nutrition-title">Пищевая ценность на 100г:</p>
            <ul className="nutrition-list">
              <li className="nutrition-item">Белки: {product.protein} г</li>
              <li className="nutrition-item">Жиры: {product.fat} г</li>
              <li className="nutrition-item">
                Углеводы: {product.carbohydrates} г
              </li>
              <li className="nutrition-item">Ккал: {product.calories} ккал</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
