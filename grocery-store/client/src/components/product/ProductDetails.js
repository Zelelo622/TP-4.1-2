import React, { useState } from "react";
import "../../assets/styles/ProductDetails.css";
import { handleAddToCart } from "../../utils/cartUtils";

const ProductDetails = ({ product }) => {
  const [showCaloriesCalculator, setShowCaloriesCalculator] = useState(false);
  const [inputCalories, setInputCalories] = useState(0);
  const [packsAmount, setPacksAmount] = useState(0);

  const handleInputChange = (e) => {
    setInputCalories(e.target.value);
  };

  const calculatePacksAmount = () => {
    const proteinPerPack = product.protein;
    const fatPerPack = product.fat;
    const carbsPerPack = product.carbohydrates;
    const caloriesPerPack = product.calories;

    const proteinPerCalorie = proteinPerPack / caloriesPerPack;
    const fatPerCalorie = fatPerPack / caloriesPerPack;
    const carbsPerCalorie = carbsPerPack / caloriesPerPack;

    const totalProtein = inputCalories * proteinPerCalorie;
    const totalFat = inputCalories * fatPerCalorie;
    const totalCarbs = inputCalories * carbsPerCalorie;

    const totalPacksAmount = Math.ceil(inputCalories / caloriesPerPack);

    setPacksAmount(totalPacksAmount);
  };

  return (
    <div className="product-details-container">
      <div className="product-image">
        <img src={process.env.REACT_APP_API_URL + product.img} alt={product.name} />
      </div>
      <div className="product-info">
        <h2 className="product-title">{product.name}</h2>
        <div className="product-cart">
          <p className="product-price">{product.price} руб.</p>
          <button className="add-to-cart-btn button" onClick={(e) => {
                  handleAddToCart(product);
                }}>В корзину</button>
        </div>
        <div className="product-description">
          <div className="product-comp">
            <p className="comp-title">Состав:</p>
            <p className="comp-text">{product.composition}</p>
          </div>
          <div className="product-nutrition">
            <div className="product-calc">
              <p className="nutrition-title">Пищевая ценность на 100г:</p>
              {/* <button className="nutrotion-calc-btn button">Калькулятор калорий</button> */}
              {showCaloriesCalculator ? (
                <div className="calories-input">
                <input
                                type="number"
                                placeholder="Введите количество калорий"
                                value={inputCalories}
                                onChange={handleInputChange}
                              />
                <button className="calculate-btn button" onClick={calculatePacksAmount}>
                Рассчитать
                </button>
                </div>
                ) : (
                <button
                className="nutrotion-calc-btn button"
                onClick={() => setShowCaloriesCalculator(true)}
                >
                Калькулятор калорий
                </button>
              )}
            </div>
            {packsAmount > 0 && (
              <p className="packs-amount">{`Количество упаковок: ${packsAmount}`}</p>
            )}
            <ul className="nutrition-list">
              <li className="nutrition-item">Белки, г: {`..............................${product.protein}`}</li>
              <li className="nutrition-item">Жиры, г: {`...............................${product.fat}`}</li>
              <li className="nutrition-item">
                Углеводы, г: {`........................${product.carbohydrates}`}
              </li>
              <li className="nutrition-item">Ккал: {`.....................................${product.calories}`}</li>
            </ul>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
