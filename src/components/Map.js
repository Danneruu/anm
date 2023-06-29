import React from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';

const MapContainer = () => {
    const mapStyles = {
        height: "100vh",
        width: "100%"};

    const defaultCenter = {
        lat: 41.3851, lng: 2.1734
    }

    return (
        <LoadScript
            googleMapsApiKey='AIzaSyCupX2F7sGKvzE7Op6iMmqgQ_vq4pdZ0O0'>
            <GoogleMap
                mapContainerStyle={mapStyles}
                zoom={13}
                center={defaultCenter}>
            </GoogleMap>
        </LoadScript>
    )
}

export default MapContainer;

