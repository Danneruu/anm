import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Test from './components/Test';
import Map from './components/Map';

function App() {
    const [location, setLocation] = useState('');
    const [city, setCity] = useState({ north: 0, south: 0, east: 0, west: 0 });
    const [earthquakes, setEarthquakes] = useState([]);
    const [searchHistory, setSearchHistory] = useState([]);
    const [loadingMap, setLoadingMap] = useState(false);

    return (
        <div className="App">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-6" style={{ overflowY: 'auto', maxHeight: '90vh' }}>
                        <Test location={location} setLocation={setLocation} setCity={setCity} setEarthquakes={setEarthquakes} earthquakes={earthquakes} searchHistory={searchHistory} setSearchHistory={setSearchHistory} />
                    </div>
                    <div className="col-lg-6">
                        <Map city={city} loadingMap={loadingMap} setLoadingMap={setLoadingMap} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
