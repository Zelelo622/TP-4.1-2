import React, { useState } from 'react';

const Filter = ({ onFilterChange }) => {
  const [priceRange, setPriceRange] = useState('');
  const [isVegetarian, setIsVegetarian] = useState('');
  const [calRange, setCalRange] = useState('');

  const handleApplyFilters = () => {
    const filters = {
      priceRange: priceRange || undefined,
      isVegetarian: isVegetarian || undefined,
      calRange: calRange || undefined,
    };
    onFilterChange(filters);
  };

  return (
    <div>
      <h3>Filters:</h3>
      <div>
        <label>Price Range:</label>
        <input type="text" value={priceRange} onChange={(e) => setPriceRange(e.target.value)} />
      </div>
      <div>
        <label>Vegetarian:</label>
        <select value={isVegetarian} onChange={(e) => setIsVegetarian(e.target.value)}>
          <option value="">All</option>
          <option value="true">Yes</option>
          <option value="false">No</option>
        </select>
      </div>
      <div>
        <label>Calorie Range:</label>
        <input type="text" value={calRange} onChange={(e) => setCalRange(e.target.value)} />
      </div>
      <button onClick={handleApplyFilters}>Apply Filters</button>
    </div>
  );
};

export default Filter;
