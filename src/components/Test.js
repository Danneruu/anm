import React, { useEffect, useState } from 'react';
import { getEarthquakesByCity, getCityCoordinates, getPlaceName } from '../services/geonames';
import { ListGroup } from 'react-bootstrap';

function Test({ location, setLocation, setCity, setEarthquakes, earthquakes, searchHistory, setSearchHistory }) {
    const [loadingData, setLoadingData] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setLoadingData(true);
            try {
                if (location) {
                    setSearchHistory(prevHistory => [...new Set([location, ...prevHistory])]);

                    const cityData = await getCityCoordinates(location);
                    const city = {
                        north: parseFloat(cityData.lat) + 1,
                        south: parseFloat(cityData.lat) - 1,
                        east: parseFloat(cityData.lng) + 1,
                        west: parseFloat(cityData.lng) - 1,
                    };
                    console.log(city);
                    setCity(city);

                    const data = await getEarthquakesByCity(city);
                    console.log("Received earthquake data: ", data);
                    const earthquakesWithPlaceNames = await Promise.all(data.earthquakes.map(async earthquake => {
                        const placeName = await getPlaceName(earthquake.lat, earthquake.lng);
                        return {...earthquake, placeName};
                    }));
                    setEarthquakes(earthquakesWithPlaceNames);
                }
            } catch (error) {
                console.error("Error fetching earthquake data:", error);
            }
            setLoadingData(false);
        };

        fetchData();
    }, [location, setCity, setEarthquakes, setSearchHistory]);

    const handleFormSubmit = (event) => {
        event.preventDefault();
        setLocation(event.target.elements.location.value);
    };

    return (
        <div>
            <h2>Recent Earthquakes in {location}</h2>
            <form onSubmit={handleFormSubmit} className="mb-3 d-flex">
                <input
                    type="text"
                    placeholder="Enter a city..."
                    name="location"
                    className="form-control me-2"
                />
                <button type="submit" className="btn btn-outline-secondary">
                    Search
                </button>
            </form>
            {loadingData ? (
                <div className="d-flex justify-content-center">
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            ) : (
                <table className="table table-striped table-bordered table-hover table-sm">
                    <thead>
                    <tr>
                        <th>Date</th>
                        <th>Magnitude</th>
                        <th>Longitude</th>
                        <th>Latitude</th>
                        <th>Region</th>
                    </tr>
                    </thead>
                    <tbody>
                    {earthquakes.map((earthquake, i) => (
                        <tr key={i}>
                            <td>{new Date(earthquake.datetime).toLocaleString()}</td>
                            <td>{earthquake.magnitude}</td>
                            <td>{earthquake.lng}</td>
                            <td>{earthquake.lat}</td>
                            <td>{earthquake.placeName}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
            <h3>Search History</h3>
            <ListGroup variant="flush">
                {searchHistory.map((item, index) => (
                    <ListGroup.Item key={index} action onClick={() => setLocation(item)}>{item}</ListGroup.Item>
                ))}
            </ListGroup>
        </div>
    );

}

export default Test;
