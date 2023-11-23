import React from 'react';

const CityList = ({ cities, onSelect }) => {
  return (
    <div>
      <label>Select a city:</label>
      <select onChange={(e) => onSelect(e.target.value)}>
        <option value="" disabled selected >Select a city</option>
        {cities.map(city => (
          <option key={city.name} value={city.name}>
            {city.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CityList;
