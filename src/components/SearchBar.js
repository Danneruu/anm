import React, { useState } from 'react';
import { getCityCoordinates, getEarthquakesByCity } from '../services/geonames';

const SearchBar = ({ setLocation, setCity, setEarthquakes }) => {
    const [inputValue, setInputValue] = useState('');

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    const handleSearch = async (event) => {
        event.preventDefault();
        setLocation(inputValue);

        const cityData = await getCityCoordinates(inputValue);
        console.log("Received cityData: ", cityData);

        setCity({
            north: parseFloat(cityData.lat) + 1,
            south: parseFloat(cityData.lat) - 1,
            east: parseFloat(cityData.lng) + 1,
            west: parseFloat(cityData.lng) - 1,
        });

        const earthquakeData = await getEarthquakesByCity(cityData);
        console.log("Received earthquakeData: ", earthquakeData);
        setEarthquakes(earthquakeData);
    };

    return (
        <form onSubmit={handleSearch}>
            <input type="text" value={inputValue} onChange={handleInputChange} placeholder="Enter a location" />
            <button type="submit">Search</button>
        </form>
    );
};

export default SearchBar;