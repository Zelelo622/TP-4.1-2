import React, { useMemo, useState } from "react";
import "../../assets/styles/ProductDetails.css";
import { handleAddToCart } from "../../utils/cartUtils";

const ProductDetails = ({ product }) => {
  const [showCaloriesCalculator, setShowCaloriesCalculator] = useState(false);
  const [inputCalories, setInputCalories] = useState(0);
  const [packsAmount, setPacksAmount] = useState(0);

  const handleInputChange = (e) => {
    setInputCalories(e.target.value);
  };

  const { totalProtein, totalFat, totalCarbs } = useMemo(() => {
    const proteinPerPack = product.protein;
    const fatPerPack = product.fat;
    const carbsPerPack = product.carbohydrates;
    const caloriesPerPack = product.calories;
    const packagingWeight = product.weight;

    const proteinPerCalorie = proteinPerPack / caloriesPerPack;
    const fatPerCalorie = fatPerPack / caloriesPerPack;
    const carbsPerCalorie = carbsPerPack / caloriesPerPack;

    const netWeight = (inputCalories / caloriesPerPack) * 100; // Масса нетто в граммах

    const totalCalories = inputCalories;
    const totalProtein = totalCalories * proteinPerCalorie;
    const totalFat = totalCalories * fatPerCalorie;
    const totalCarbs = totalCalories * carbsPerCalorie;

    const totalPacksAmount = inputCalories <= 0 ? 0 : Math.ceil((netWeight + packagingWeight) / 1000);

    setPacksAmount(totalPacksAmount);

    // Возвращаем объект с результатами вычислений
    return {
      totalProtein,
      totalFat,
      totalCarbs,
    };
  }, [inputCalories]);

  return (
    <div className="product-details-container">
      <div className="product-image">
        <img
          src={process.env.REACT_APP_API_URL + product.img}
          alt={product.name}
        />
      </div>
      <div className="product-info">
        <h2 className="product-title">{product.name}</h2>
        <div className="product-cart">
          <p className="product-price">{product.price} руб.</p>
          <button
            className="add-to-cart-btn button"
            onClick={(e) => {
              handleAddToCart(product);
            }}
          >
            В корзину
          </button>
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
                <button
                  className="calculate-btn button"
                  onClick={() => setShowCaloriesCalculator(false)}
                >
                  Закрыть
                </button>
              ) : (
                <button
                  className="nutrotion-calc-btn button"
                  onClick={() => setShowCaloriesCalculator(true)}
                >
                  Калькулятор калорий
                </button>
              )}
            </div>
            <ul className="nutrition-list">
              <li className="nutrition-item">
                Белки, г:{" "}
                {`..............................${
                  showCaloriesCalculator
                    ? isNaN(totalProtein)
                      ? "0.0"
                      : totalProtein.toFixed(1)
                    : product.protein
                }`}
              </li>
              <li className="nutrition-item">
                Жиры, г:{" "}
                {`...............................${
                  showCaloriesCalculator
                    ? isNaN(totalFat)
                      ? "0.0"
                      : totalFat.toFixed(1)
                    : product.fat
                }`}
              </li>
              <li className="nutrition-item">
                Углеводы, г:{" "}
                {`........................${
                  showCaloriesCalculator
                    ? isNaN(totalCarbs)
                      ? "0.0"
                      : totalCarbs.toFixed(1)
                    : product.carbohydrates
                }`}
              </li>

              {showCaloriesCalculator ? (
                <li className="nutrition-item">
                  Ккал: {`.....................................`}
                  <input
                    className="calories-input"
                    type="number"
                    placeholder="Введите количество калорий"
                    value={inputCalories}
                    onChange={handleInputChange}
                  />
                </li>
              ) : (
                <li className="nutrition-item">
                  Ккал:{" "}
                  {`.....................................${product.calories}`}
                </li>
              )}
            </ul>
            {showCaloriesCalculator ? (
              packsAmount > 0 && (
                <p className="packs-amount">{`Количество упаковок: ${packsAmount}`}</p>
              )
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
