import React, { useState } from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook

const Search = () => {
  const navigate = useNavigate(); // Get the navigate function

  const [yearRange, setYearRange] = useState([1990, 2023]);
  const [priceRange, setPriceRange] = useState([1000, 80000]);
  const [kilometersRange, setKilometersRange] = useState([10000, 200000]);
  const [keyword, setKeyword] = useState("");
 
  const searchHandler = (e) => {
    e.preventDefault();

    const queryParams = `year[gte]=${yearRange[0]}&year[lte]=${yearRange[1]}&price[gte]=${priceRange[0]}&price[lte]=${priceRange[1]}&kilometers[gte]=${kilometersRange[0]}&kilometers[lte]${kilometersRange[1]}`;

    
        navigate(`/search?${keyword}&${queryParams}`, {
          state: {
            keyword,
            yearRange,
            priceRange,
            kilometersRange,
          },
        });
    
    
    
  };

  return (
    <div className= "search"  >
      <form >
        <div className="mb-3">
          <label htmlFor="searchTerm" className="form-label">
            Search by Make, Model, or Body
          </label>
          <input type="text" className="form-control " id="searchTerm" placeholder="Enter search keyword" onChange={(e)=>setKeyword(e.target.value)}/>
        </div>
        <div className="mb-3 searchBy">
          <label className="form-label">
            Year: {yearRange[0]} - {yearRange[1]}
          </label>
          <Slider
            range
            min={1990}
            max={2023}
            value={yearRange}
            onChange={setYearRange}
          />
        </div>
        <div className="mb-3 searchBy">
          <label className="form-label">
            Price: ${priceRange[0]} - ${priceRange[1]}
          </label>
          <Slider
            range
            min={1000}
            max={80000}
            value={priceRange}
            onChange={setPriceRange}
          />
        </div>
        <div className="mb-3 searchBy">
          <label className="form-label">
            Kilometers: {kilometersRange[0]} - {kilometersRange[1]}
          </label>
          <Slider
            range
            min={10000}
            max={200000}
            value={kilometersRange}
            onChange={setKilometersRange}
          />
        </div>
        <div className="d-flex justify-content-center">
        <button id="search-btn" type="button" className="btn btn-primary" onClick={searchHandler}>
          Search
        </button>
        </div>
      </form>
    </div>
  );
};

export default Search;
