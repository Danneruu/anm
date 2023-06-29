import React, { useState } from 'react';
import './App.css';
import Test from './components/Test';
import Map from './components/Map';

function App() {
    const [location, setLocation] = useState('');

    const handleInputChange = (event) => {
        setLocation(event.target.value);
    };

    return (
        <div className="App">
            <input type="text" value={location} onChange={handleInputChange} placeholder="Enter a location" />
            <Test location={location} />
            <Map />
        </div>
    );
}

export default App;
