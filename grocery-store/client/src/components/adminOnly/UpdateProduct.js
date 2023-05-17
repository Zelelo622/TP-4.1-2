import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { fetchOneProduct, updateProduct } from "../../http/productAPI";
import { PRODUCTS } from "../../utils/consts";

const UpdateProduct = () => {
  const { name } = useParams();
  const [product, setProduct] = useState({});
  const [file, setFile] = useState(null);
  const [currentImage, setCurrentImage] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    fetchOneProduct(name).then((data) => {
      setProduct(data);
      setCurrentImage(data.img);
    });
  }, [name]);

  const selectFile = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFile(file);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleSwitchChange = (event) => {
    const { name, checked } = event.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: checked,
    }));
  };

  const updateProductData = async () => {
    try {
      const updatedProduct = new FormData();
      updatedProduct.append("newName", product.name);
      updatedProduct.append("price", product.price);
      updatedProduct.append("composition", product.composition);
      updatedProduct.append("protein", product.protein);
      updatedProduct.append("fat", product.fat);
      updatedProduct.append("carbohydrates", product.carbohydrates);
      updatedProduct.append("calories", product.calories);
      updatedProduct.append("weight", product.weight);
      updatedProduct.append("vegetarian", product.vegetarian);

      if (file) {
        updatedProduct.append("img", file);
      }
      await updateProduct(name, updatedProduct);
      window.location.href = PRODUCTS + "/" + product.categoryId;
    } catch (e) {
      setErrorMessage(e.response.data.error);
    }
  };

  return (
    <div className="product-details-container">
      <div className="product-image">
        <Form.Control type="file" onChange={selectFile} />
        {currentImage && (
          <p className="mt-3">
            <span style={{ fontWeight: "500" }}>Предыдущий файл:</span>{" "}
            {currentImage}
          </p>
        )}
      </div>
      <div className="product-info">
        <div className="admin-prod-cont">
          <h2 className="product-title">Наименование</h2>
          <Form.Control
            className="admin-product-input"
            type="text"
            placeholder="Название"
            name="name"
            value={product.name}
            onChange={handleInputChange}
          />
        </div>
        <div className="admin-prod-cont">
          <p className="product-price admin-product-price">Цена</p>
          <Form.Control
            className="admin-product-input"
            type="number"
            placeholder="Цена"
            name="price"
            value={product.price}
            onChange={handleInputChange}
          />
        </div>
        <div className="admin-prod-cont">
          <p className="product-price admin-product-price">Масса нетто (г.)</p>
          <Form.Control
            className="admin-product-input"
            type="number"
            placeholder="Вес"
            name="weight"
            value={product.weight}
            onChange={handleInputChange}
          />
        </div>
        <div className="admin-prod-cont">
          <Form.Check
            type="switch"
            id="vegetarian-switch"
            label="Для вегетарианцев"
            name="vegetarian"
            checked={product.vegetarian}
            onChange={handleSwitchChange}
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
                name="composition"
                value={product.composition}
                onChange={handleInputChange}
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
                  name="protein"
                  value={product.protein}
                  onChange={handleInputChange}
                />
              </li>
              <li className="nutrition-item admin-nutrition-item">
                <span className="nutrition-item-text">Жиры, г:</span>
                {"..............................."}{" "}
                <Form.Control
                  className="admin-product-input admin-calc-input"
                  type="number"
                  name="fat"
                  value={product.fat}
                  onChange={handleInputChange}
                />
              </li>
              <li className="nutrition-item admin-nutrition-item">
                <span className="nutrition-item-text">Углеводы, г:</span>
                {"........................"}
                <Form.Control
                  className="admin-product-input admin-calc-input"
                  type="number"
                  name="carbohydrates"
                  value={product.carbohydrates}
                  onChange={handleInputChange}
                />
              </li>
              <li className="nutrition-item admin-nutrition-item">
                <span className="nutrition-item-text">Ккал:</span>{" "}
                {"....................................."}
                <Form.Control
                  className="admin-product-input admin-calc-input"
                  type="number"
                  name="calories"
                  value={product.calories}
                  inputMode="numeric"
                  min="0"
                  onChange={handleInputChange}
                />
              </li>
            </ul>
          </div>
        </div>
        {errorMessage && <div className="error-message">{errorMessage}</div>}
        <button
          onClick={updateProductData}
          className="button admin-add-prod-btn"
        >
          Обновить
        </button>
      </div>
    </div>
  );
};

export default UpdateProduct;
