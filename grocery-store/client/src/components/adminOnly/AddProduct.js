import { observer } from "mobx-react-lite";
import React, { useContext, useState } from "react";
import { Form } from "react-bootstrap";
import { Context } from "../..";
import { createProduct } from "../../http/productAPI";
import { PRODUCTS } from "../../utils/consts";

const AdminProductForm = observer(() => {
  const { category } = useContext(Context);
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [composition, setComposition] = useState("");
  const [protein, setProtein] = useState(0);
  const [fat, setFat] = useState(0);
  const [carbohydrates, setCarbohydrates] = useState(0);
  const [calories, setCalories] = useState(0);
  const [weight, setWeight] = useState(0);
  const [vegetarian, setVegetarian] = useState(false);
  const [file, setFile] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const selectFile = (e) => {
    setFile(e.target.files[0]);
  };

  const addProduct = async () => {
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("price", price);
      formData.append("composition", composition);
      formData.append("protein", protein);
      formData.append("fat", fat);
      formData.append("carbohydrates", carbohydrates);
      formData.append("calories", calories);
      formData.append("weight", weight);
      formData.append("vegetarian", vegetarian);
      formData.append("img", file);
      formData.append("categoryId", category.categoryId);
      await createProduct(formData);
      window.location.href = PRODUCTS + "/" + category.categoryId;
    } catch (e) {
      setErrorMessage(e.response.data.error);
    }
  };

  return (
    <div className="product-details-container">
      <div className="product-image">
        <Form.Control type="file" onChange={selectFile} />
      </div>
      <div className="product-info">
        <div className="admin-prod-cont">
          <h2 className="product-title">Наименование</h2>
          <Form.Control
            className="admin-product-input"
            type="text"
            placeholder="Название"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="admin-prod-cont">
          <p className="product-price admin-product-price">Цена</p>
          <Form.Control
            className="admin-product-input"
            type="number"
            placeholder="Цена"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <div className="admin-prod-cont">
          <p className="product-price admin-product-price">Масса нетто (г.)</p>
          <Form.Control
            className="admin-product-input"
            type="number"
            placeholder="Вес"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
          />
        </div>
        <div className="admin-prod-cont">
          <Form.Check
            type="switch"
            id="vegetarian-switch"
            label="Для вегетарианцев"
            checked={vegetarian}
            onChange={(e) => setVegetarian(e.target.checked)}
          />
        </div>
        <div className="product-description">
          <div className="product-comp">
            <p className="comp-title">Состав:</p>
            <p className="comp-text">
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Состав"
                value={composition}
                onChange={(e) => setComposition(e.target.value)}
              />
            </p>
          </div>
          <div className="product-nutrition">
            <div className="product-calc">
              <p className="nutrition-title">Пищевая ценность на 100г:</p>
            </div>
            <ul className="nutrition-list">
              <li className="nutrition-item admin-nutrition-item">
                <span className="nutrition-item-text">Белки, г:</span>
                {".............................."}
                <Form.Control
                  className="admin-product-input admin-calc-input"
                  type="number"
                  value={protein}
                  onChange={(e) => setProtein(e.target.value)}
                />
              </li>
              <li className="nutrition-item admin-nutrition-item">
                <span className="nutrition-item-text">Жиры, г:</span>
                {"..............................."}{" "}
                <Form.Control
                  className="admin-product-input admin-calc-input"
                  type="number"
                  value={fat}
                  onChange={(e) => setFat(e.target.value)}
                />
              </li>
              <li className="nutrition-item admin-nutrition-item">
                <span className="nutrition-item-text">Углеводы, г:</span>
                {"........................"}
                <Form.Control
                  className="admin-product-input admin-calc-input"
                  type="number"
                  value={carbohydrates}
                  onChange={(e) => setCarbohydrates(e.target.value)}
                />
              </li>
              <li className="nutrition-item admin-nutrition-item">
                <span className="nutrition-item-text">Ккал:</span>{" "}
                {"....................................."}
                <Form.Control
                  className="admin-product-input admin-calc-input"
                  type="number"
                  value={calories}
                  onChange={(e) => setCalories(e.target.value)}
                  inputMode="numeric"
                  min="0"
                />
              </li>
            </ul>
          </div>
        </div>
        {errorMessage && <div className="error-message">{errorMessage}</div>}
        <button onClick={addProduct} className="button admin-add-prod-btn">
          Добавить
        </button>
      </div>
    </div>
  );
});

export default AdminProductForm;
