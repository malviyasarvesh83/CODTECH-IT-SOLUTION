const apiKey = '50236b9a61b54e1a498123d242273766';

// Function to fetch weather Data
async function fetchWeatherData(city) {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`);
    const data = await response.json();
    console.log(data);
    updateWeatherUI(data);
}

const cityName = document.querySelector('.city');
const temperature = document.querySelector('.temp');
const windSpeed = document.querySelector('.wind-speed');
const humidity = document.querySelector('.humidity');
const visibility = document.querySelector('.visibility-distance');
const descriptionText = document.querySelector('.description-text');
const date = document.querySelector('.date');

// Function to update weather data
function updateWeatherUI(data) {
    cityName.textContent = data.name;
    temperature.textContent = `${Math.round(data.main.temp)}°`;
    windSpeed.textContent = `${data.wind.speed} km/h`;
    humidity.textContent = `${data.main.humidity}%`;
    visibility.textContent = `${data.visibility / 1000}km/h`;
    descriptionText.textContent = data.weather[0].description;
    
    const currentDate = new Date();
    date.textContent = currentDate.toDateString();

    const descriptionIcon = document.querySelector('.description i');

    const weatherIconName = getWeatherIconName(data.weather[0].main);
    descriptionIcon.innerHTML = `<i class="material-icons">${weatherIconName}</i>`;
}

const formElement = document.querySelector('.search-form');
const inputElement = document.querySelector('.city-input');

// Form to fill the City Name from User
formElement.addEventListener('submit', function (e) {
    e.preventDefault();

    const city = inputElement.value;
    if (city !== '') {
        fetchWeatherData(city);
        inputElement.value = '';
    }
})

// Weather Condition change Icon
function getWeatherIconName(weatherCondition) {
    const iconMap = {
        Clear: 'wb_sunny',
        Clouds: 'wb_cloudy',
        Rain: 'umbrella',
        Thunderstorm: 'flash_on',
        Drizzle: 'grain',
        Snow: 'ac_unit',
        Mist: 'cloud',
        Smoke: 'cloud',
        Haze: 'cloud',
        Fog: 'cloud',
    }
    return iconMap[weatherCondition] || "help";
}