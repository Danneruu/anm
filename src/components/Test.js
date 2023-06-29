import React, { useEffect, useState } from 'react';
import { getEarthquakesByCity, getCityCoordinates } from '../services/geonames';

function Test({ location }) {
    const [earthquakes, setEarthquakes] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (location) {
                    const cityData = await getCityCoordinates(location);
                    const city = {
                        north: cityData.lat + 1,
                        south: cityData.lat - 1,
                        east: cityData.lng + 1,
                        west: cityData.lng - 1,
                    };
                    const data = await getEarthquakesByCity(city);
                    setEarthquakes(data.earthquakes);
                }
            } catch (error) {
                console.error("Error fetching earthquake data:", error);
            }
        };

        fetchData();
    }, [location]);

    return (
        <div>
            <h1>Recent Earthquakes</h1>
            {earthquakes.map((quake, index) => (
                <div key={index}>
                    <p>Magnitude: {quake.magnitude}</p>
                    <p>Date: {new Date(quake.datetime).toLocaleString()}</p>
                    <p>Latitude: {quake.lat}</p>
                    <p>Longitude: {quake.lng}</p>
                    <hr />
                </div>
            ))}
        </div>
    );
}

export default Test;
