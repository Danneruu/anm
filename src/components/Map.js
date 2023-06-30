import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { Spinner } from 'react-bootstrap';

const MapContainer = ({ city }) => {
    const mapStyles = {
        height: "100vh",
        width: "100%"
    };

    const [center, setCenter] = useState({ lat: 41.3851, lng: 2.1734 });
    const [loadingMap, setLoadingMap] = useState(true);

    useEffect(() => {
        setLoadingMap(true);
        if (city.north !== 0) {
            setCenter({ lat: (city.north + city.south) / 2, lng: (city.east + city.west) / 2 });
        }
        setLoadingMap(false);
    }, [city]);

    return (
        <LoadScript
            googleMapsApiKey=''>
            {loadingMap ? (
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            ) : (
                <GoogleMap
                    mapContainerStyle={mapStyles}
                    zoom={8}
                    center={center}>
                    <Marker position={center} />
                </GoogleMap>
            )}
        </LoadScript>
    )
}

export default MapContainer;
