async function getMyLocation() {

    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
    });
}

const cityRef = document.getElementById('city');
const localRef = document.querySelector('#getWeather');
const formRef = document.querySelector('#weather');
const getCityBtnRef = document.querySelector('#getCity');


getCityBtnRef.addEventListener('click', async (ev) =>{
    const {coords: {latitude, longitude}} = await getMyLocation();

    const {name} = await getCity(longitude, latitude);

    cityRef.value = name;
})

formRef.addEventListener('submit', async (ev) => {
    ev.preventDefault();
    const city = cityRef.value;

    if (city !== '') {
        const {coord: {lon, lat}} = await getLocation(city);

        const data = await getWeather(lon, lat);
        console.log(data)
    };
})

const apiKey = '68e2a081a82b3b45bc6a1f69cd8105aa'; // API OpenWeatherMap
async function getLocation(city) {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`)

    return await response.json();
}

async function getCity(long, lat) {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}`);

    return await response.json();
}

async function getWeather(long, lat) {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}`);

    return await response.json();
}