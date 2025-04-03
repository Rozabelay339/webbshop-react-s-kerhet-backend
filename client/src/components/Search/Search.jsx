import React, { useState } from 'react';
import './Search.css'; 

const Search = ({ searchProducts }) => {
  const [query, setQuery] = useState(""); 
 
  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSearch = () => {
    if (query.trim()) {
      searchProducts(query); 
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="search-container"> 
      <input 
        type="text" 
        placeholder="Search by category..." 
        value={query}
        onChange={handleInputChange} 
        onKeyDown={handleKeyDown}
      />
      <button onClick={handleSearch} disabled={!query.trim()}>Search</button>
    </div>
  );
};

export default Search;
