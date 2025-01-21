const apiKey = "84674b82ba66ef10c72996e0eb4ee152";
const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');
const weatherIcon = document.getElementById('weather-icon');
const temperature = document.getElementById('temp');
const cityName = document.getElementById('city');
const humidity = document.getElementById('humidity');
const windSpeed = document.getElementById('wind-speed');

async function checkWeather(city) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
        
        if (!response.ok) {
            throw new Error('City not found');
        }

        const data = await response.json();

        cityName.textContent = data.name;
        temperature.textContent = Math.round(data.main.temp);
        humidity.textContent = data.main.humidity;
        windSpeed.textContent = (data.wind.speed * 3.6).toFixed(2); // Convert m/s to km/h
        weatherIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    } catch (error) {
        alert('Please enter a valid city name');
    }
}

searchBtn.addEventListener('click', () => {
    checkWeather(searchInput.value);
});

searchInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        checkWeather(searchInput.value);
    }
});

// Default city
checkWeather('New Delhi');