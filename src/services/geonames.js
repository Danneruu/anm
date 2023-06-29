import axios from 'axios';

const EARTHQUAKES_API_URL = 'http://api.geonames.org/earthquakesJSON?';
const CITY_API_URL = 'http://api.geonames.org/searchJSON';

export async function getCityCoordinates(cityName) {
    const response = await axios.get(CITY_API_URL, {
        params: {
            q: cityName,
            maxRows: 1,
            username: 'dannylt',
        },
    });

    return response.data.geonames[0];
}

export async function getEarthquakesByCity(city) {
    const response = await axios.get(EARTHQUAKES_API_URL, {
        params: {
            north: city.north,
            south: city.south,
            east: city.east,
            west: city.west,
            username: 'dannylt',
        },
    });

    return response.data;
}
