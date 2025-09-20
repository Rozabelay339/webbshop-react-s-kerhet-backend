import React from 'react';
import './Search.css';

const Search = ({ searchProducts }) => {
  const handleInputChange = (e) => {
    searchProducts(e.target.value);
  };

  return (
    <div className="search-container">
      <input 
        type="text" 
        placeholder="Search products" 
        onChange={handleInputChange} 
      />
    </div>
  );
};

export default Search;
