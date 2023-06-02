import React, { useState, useEffect } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { NumericFormat } from "react-number-format";
import { Modal } from "react-bootstrap";

const Filter = ({
  onFilterChange,
  minPrice,
  maxPrice,
  minCalories,
  maxCalories,
}) => {
  const [priceRange, setPriceRange] = useState([minPrice, maxPrice]);
  const [isVegetarian, setIsVegetarian] = useState("");
  const [calRange, setCalRange] = useState([minCalories, maxCalories]);
  const [timer, setTimer] = useState(null);

  const [showFilter, setShowFilter] = useState(false);
  const handleClose = () => setShowFilter(false);
  const handleShow = () => setShowFilter(true);

  const handleApplyFilters = () => {
    const filters = {
      priceRange: priceRange.join("-"),
      isVegetarian: isVegetarian || undefined,
      calRange: calRange.join("-"),
    };
    onFilterChange(filters);
  };

  useEffect(() => {
    setPriceRange([minPrice, maxPrice]);
    setCalRange([minCalories, maxCalories]);
  }, [minPrice, maxPrice, minCalories, maxCalories]);

  useEffect(() => {
    clearTimeout(timer);
    setTimer(setTimeout(handleApplyFilters, 500));
  }, [priceRange, isVegetarian, calRange]);

  return (
    <>
      <div className="filter-mobile">
        <button
          className="btn filter-mobile-btn"
          variant="primary"
          onClick={handleShow}
        >
          <span className="filter-mobile-btn-icon"></span>
          Фильтр
        </button>

        <Modal className="filter-modal" show={showFilter} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Фильтр:</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="filter">
              <div className="filter-item">
                <label>Цена:</label>
                <div className="filter-inputs">
                  <NumericFormat
                    thousandSeparator={false}
                    allowNegative={false}
                    placeholder="Min"
                    value={priceRange[0]}
                    onValueChange={(values) =>
                      setPriceRange([values.value, priceRange[1]])
                    }
                  />
                  <NumericFormat
                    thousandSeparator={false}
                    allowNegative={false}
                    placeholder="Max"
                    value={priceRange[1]}
                    onValueChange={(values) =>
                      setPriceRange([priceRange[0], values.value])
                    }
                  />
                </div>
                <Slider
                  className="filter-slider"
                  range
                  min={minPrice}
                  max={maxPrice}
                  value={priceRange}
                  onChange={(value) => setPriceRange(value)}
                />
              </div>
              <div className="filter-item">
                <label>Количество калорий:</label>
                <div className="filter-inputs">
                  <NumericFormat
                    thousandSeparator={false}
                    allowNegative={false}
                    placeholder="Min"
                    value={calRange[0]}
                    onValueChange={(values) =>
                      setCalRange([values.value, calRange[1]])
                    }
                  />
                  <NumericFormat
                    thousandSeparator={false}
                    allowNegative={false}
                    placeholder="Max"
                    value={calRange[1]}
                    onValueChange={(values) =>
                      setCalRange([calRange[0], values.value])
                    }
                  />
                </div>
                <Slider
                  className="filter-slider"
                  range
                  min={minCalories}
                  max={maxCalories}
                  value={calRange}
                  onChange={(value) => setCalRange(value)}
                />
              </div>
              <div className="filter-item">
                <label>Для вегетарианцев:</label>
                <div className="filter-checkboxes">
                  <label>
                    <input
                      type="checkbox"
                      checked={isVegetarian === "true"}
                      onChange={(e) => {
                        setIsVegetarian(e.target.checked ? "true" : "");
                        window.ym(93802517, "reachGoal", "YesBtnFilterClick");
                      }}
                    />
                    <span className="checkbox-custom"></span>
                    Да
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      checked={isVegetarian === "false"}
                      onChange={(e) => {
                        setIsVegetarian(e.target.checked ? "false" : "");
                        window.ym(93802517, "reachGoal", "NoBtnFilterClick");
                      }}
                    />
                    <span className="checkbox-custom"></span>
                    Нет
                  </label>
                </div>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <button
              className="btn filter-btn-clear"
              onClick={() => {
                setPriceRange([minPrice, maxPrice]);
                setIsVegetarian("");
                setCalRange([minCalories, maxCalories]);
                onFilterChange({});
              }}
            >
              Очистить фильтры
            </button>
            <button className="btn filter-btn-show" onClick={handleClose}>
              Показать
            </button>
          </Modal.Footer>
        </Modal>
      </div>

      <div className="filter-wrapper">
        <div className="filter">
          <h3 className="filter-title">Фильтр:</h3>
          <div className="filter-item">
            <label>Цена:</label>
            <div className="filter-inputs">
              <NumericFormat
                thousandSeparator={false}
                allowNegative={false}
                placeholder="Min"
                value={priceRange[0]}
                onValueChange={(values) =>
                  setPriceRange([values.value, priceRange[1]])
                }
              />
              <NumericFormat
                thousandSeparator={false}
                allowNegative={false}
                placeholder="Max"
                value={priceRange[1]}
                onValueChange={(values) =>
                  setPriceRange([priceRange[0], values.value])
                }
              />
            </div>
            <Slider
              className="filter-slider"
              range
              min={minPrice}
              max={maxPrice}
              value={priceRange}
              onChange={(value) => setPriceRange(value)}
            />
          </div>
          <div className="filter-item">
            <label>Количество калорий:</label>
            <div className="filter-inputs">
              <NumericFormat
                thousandSeparator={false}
                allowNegative={false}
                placeholder="Min"
                value={calRange[0]}
                onValueChange={(values) =>
                  setCalRange([values.value, calRange[1]])
                }
              />
              <NumericFormat
                thousandSeparator={false}
                allowNegative={false}
                placeholder="Max"
                value={calRange[1]}
                onValueChange={(values) =>
                  setCalRange([calRange[0], values.value])
                }
              />
            </div>
            <Slider
              className="filter-slider"
              range
              min={minCalories}
              max={maxCalories}
              value={calRange}
              onChange={(value) => setCalRange(value)}
            />
          </div>
          <div className="filter-item">
            <label>Для вегетарианцев:</label>
            <div className="filter-checkboxes">
              <label>
                <input
                  type="checkbox"
                  checked={isVegetarian === "true"}
                  onChange={(e) =>
                    setIsVegetarian(e.target.checked ? "true" : "")
                  }
                />
                <span className="checkbox-custom"></span>
                Да
              </label>
              <label>
                <input
                  type="checkbox"
                  checked={isVegetarian === "false"}
                  onChange={(e) =>
                    setIsVegetarian(e.target.checked ? "false" : "")
                  }
                />
                <span className="checkbox-custom"></span>
                Нет
              </label>
            </div>
          </div>
          <div className="filter-buttons">
            <button
              className="btn filter-btn-clear"
              onClick={() => {
                setPriceRange([minPrice, maxPrice]);
                setIsVegetarian("");
                setCalRange([0, 2000]);
                onFilterChange({});
              }}
            >
              Очистить фильтры
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Filter;
