import axios from 'axios';

const EARTHQUAKES_API_URL = 'http://api.geonames.org/earthquakesJSON?';
const CITY_API_URL = 'http://api.geonames.org/searchJSON';
const PLACE_NAME_API_URL = 'http://api.geonames.org/findNearbyPlaceNameJSON';

export async function getCityCoordinates(cityName) {
    const response = await axios.get(CITY_API_URL, {
        params: {
            q: cityName,
            maxRows: 1,
            username: 'dannylt',
        },
    });

    console.log('Geonames API Response:', response.data);
    return response.data.geonames[0];
}

export async function getEarthquakesByCity(city) {
    const response = await axios.get(EARTHQUAKES_API_URL, {
        params: {
            north: parseFloat(city.north),
            south: parseFloat(city.south),
            east: parseFloat(city.east),
            west: parseFloat(city.west),
            username: 'dannylt',
        },
    });

    return response.data;
}

export async function getPlaceName(lat, lng) {
    const response = await axios.get(PLACE_NAME_API_URL, {
        params: {
            lat,
            lng,
            username: 'dannylt',
        },
    });

    return response.data.geonames[0]?.name;
}


