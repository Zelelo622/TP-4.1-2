import React, { useState, useEffect } from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { NumericFormat } from 'react-number-format';


const Filter = ({ onFilterChange }) => {
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [isVegetarian, setIsVegetarian] = useState('');
  const [calRange, setCalRange] = useState([0, 2000]);
  const [timer, setTimer] = useState(null);

  const handleApplyFilters = () => {
    const filters = {
      priceRange: priceRange.join('-'),
      isVegetarian: isVegetarian || undefined,
      calRange: calRange.join('-'),
    };
    onFilterChange(filters);
  };

  useEffect(() => {
    clearTimeout(timer);
    setTimer(setTimeout(handleApplyFilters, 500));
  }, [priceRange, isVegetarian, calRange]);

  return (
    <div className='filter'>
      <h3 className='filter-title'>Фильтр:</h3>
      <div className='filter-item'>
        <label>Цена:</label>
        <div className='filter-inputs'>
          <NumericFormat
            thousandSeparator={false}
            allowNegative={false}
            placeholder="Min"
            value={priceRange[0]}
            onValueChange={(values) => setPriceRange([values.value, priceRange[1]])}
          />
          <NumericFormat
            thousandSeparator={false}
            allowNegative={false}
            placeholder="Max"
            value={priceRange[1]}
            onValueChange={(values) => setPriceRange([priceRange[0], values.value])}
          />
        </div>
        <Slider
          className='filter-slider'
          range
          min={0}
          max={1000}
          value={priceRange}
          onChange={(value) => setPriceRange(value)}
        />
      </div>
      <div className='filter-item'>
        <label>Количество калорий:</label>
        <div className='filter-inputs'>
          <NumericFormat
            thousandSeparator={false}
            allowNegative={false}
            placeholder="Min"
            value={calRange[0]}
            onValueChange={(values) => setCalRange([values.value, calRange[1]])}
          />
          <NumericFormat
            thousandSeparator={false}
            allowNegative={false}
            placeholder="Max"
            value={calRange[1]}
            onValueChange={(values) => setCalRange([calRange[0], values.value])}
          />
        </div>
        <Slider
          className='filter-slider'
          range
          min={0}
          max={2000}
          value={calRange}
          onChange={(value) => setCalRange(value)}
        />
      </div>
      <div className='filter-item'>
        <label>Для вегетарианцев:</label>
        <div className='filter-checkboxes'>
          <label>
            <input type="checkbox" checked={isVegetarian === 'true'} onChange={(e) => setIsVegetarian(e.target.checked ? 'true' : '')} />
            <span className="checkbox-custom"></span>
            Да
          </label>
          <label>
            <input type="checkbox" checked={isVegetarian === 'false'} onChange={(e) => setIsVegetarian(e.target.checked ? 'false' : '')} />
            <span className="checkbox-custom"></span>
            Нет
          </label>
        </div>
      </div>
    </div>
  );
};

export default Filter;
