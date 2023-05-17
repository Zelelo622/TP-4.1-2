import React, { useContext, useMemo, useState } from "react";
import "../../assets/styles/ProductDetails.css";
import { handleAddToCart } from "../../utils/cartUtils";
import { NumericFormat } from "react-number-format";
import { observer } from "mobx-react-lite";
import { Context } from "../..";
import { Link } from "react-router-dom";
import { PRODUCTS, PRODUCT_UPDATE } from "../../utils/consts";
import { deleteProduct } from "../../http/productAPI";
import { Button, Modal } from "react-bootstrap";

const ProductDetails = observer(({ product }) => {
  const [showCaloriesCalculator, setShowCaloriesCalculator] = useState(false);
  const [inputCalories, setInputCalories] = useState(0);
  const [packsAmount, setPacksAmount] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const { user } = useContext(Context);

  const handleInputChange = (e) => {
    setInputCalories(e.target.value);
  };

  const handleDeleteProduct = async () => {
    await deleteProduct(product.name);
    window.location.href = PRODUCTS + "/" + product.categoryId;
  };

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const { totalProtein, totalFat, totalCarbs } = useMemo(() => {
    const proteinPer100g = product.protein;
    const fatPer100g = product.fat;
    const carbsPer100g = product.carbohydrates;
    const caloriesPer100g = product.calories;
    const packagingWeight = product.weight;

    const proteinPerCalorie = proteinPer100g / caloriesPer100g;
    const fatPerCalorie = fatPer100g / caloriesPer100g;
    const carbsPerCalorie = carbsPer100g / caloriesPer100g;

    const totalCalories = inputCalories;
    const totalWeight = (totalCalories / caloriesPer100g) * 100;

    const totalPacksAmount =
      totalCalories <= 0 ? 0 : Math.ceil(totalWeight / packagingWeight);

    setPacksAmount(totalPacksAmount);

    return {
      totalProtein: totalCalories * proteinPerCalorie,
      totalFat: totalCalories * fatPerCalorie,
      totalCarbs: totalCalories * carbsPerCalorie,
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
          {user.user.role !== "ADMIN" ? (
            <button
              className="add-to-cart-btn button"
              onClick={(e) => {
                handleAddToCart(product);
              }}
            >
              В корзину
            </button>
          ) : (
            <>
              <Link
                to={PRODUCT_UPDATE + `/${product.name}`}
                className="add-to-cart-btn button"
              >
                Редактировать товар
              </Link>
              <button
                onClick={handleShowModal}
                style={{ marginLeft: "10px" }}
                className="add-to-cart-btn add-to-cart-btn-red button"
              >
                Удалить
              </button>
              <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                  <Modal.Title>Вы точно хотите удалить товар?</Modal.Title>
                </Modal.Header>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleCloseModal}>
                    Нет
                  </Button>
                  <Button variant="primary" onClick={handleDeleteProduct}>
                    Да
                  </Button>
                </Modal.Footer>
              </Modal>
            </>
          )}
        </div>
        <div className="product-container-info">
          <p className="product-weight">Масса нетто:</p>
          <p className="product-weight-val">{product.weight} г.</p>
        </div>
        <div className="product-container-info">
          <p className="product-vegetarian">
            {product.vegetarian
              ? "Вегетарианский продукт"
              : "Не вегетарианский продукт"}
          </p>
        </div>
        <div className="product-cart-"></div>
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
                  <NumericFormat
                    className="calories-input"
                    thousandSeparator={false}
                    allowNegative={false}
                    value={inputCalories}
                    onChange={handleInputChange}
                    format="####"
                    mask="_"
                    maxLength={4}
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
                <p className="packs-amount">
                  Количество упаковок: <span>{packsAmount}</span>
                </p>
              )
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </div>
  );
});

export default ProductDetails;
