const apiKey = '9a216b8471a0a470892c343e497eedc6'; // Встав сюди свій API Key

const cityInput = document.getElementById('city-input');
const searchBtn = document.getElementById('search-btn');
const weatherInfo = document.getElementById('weather-info');
const errorMessage = document.getElementById('error-message');

// Елементи для виведення даних
const cityName = document.getElementById('city-name');
const weatherIcon = document.getElementById('weather-icon');
const temperature = document.getElementById('temperature');
const description = document.getElementById('description');
const humidity = document.getElementById('humidity');
const wind = document.getElementById('wind');

async function checkWeather(city) {
    // URL для запиту (lang=uk забезпечує опис погоди українською мовою)
    const url = `https://openweathermap.org{city}&appid=${apiKey}&units=metric&lang=uk`;

    try {
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error('Місто не знайдено');
        }

        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        showError();
    }
}

function displayWeather(data) {
    // Ховаємо помилку, показуємо картку з погодою
    errorMessage.classList.add('hidden');
    weatherInfo.classList.remove('hidden');

    // Оновлюємо дані на сторінці
    cityName.textContent = `${data.name}, ${data.sys.country}`;
    temperature.textContent = `${Math.round(data.main.temp)}°C`;
    description.textContent = data.weather[0].description;
    humidity.textContent = data.main.humidity;
    wind.textContent = data.wind.speed;

    // Встановлюємо офіційну іконку погоди
    const iconCode = data.weather[0].icon;
    weatherIcon.src = `https://openweathermap.org{iconCode}@2x.png`;
}

function showError() {
    weatherInfo.classList.add('hidden');
    errorMessage.classList.remove('hidden');
}

// Обробник кліку на кнопку
searchBtn.addEventListener('click', () => {
    const city = cityInput.value.trim();
    if (city) {
        checkWeather(city);
    }
});

// Обробник натискання Enter в інпуті
cityInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        const city = cityInput.value.trim();
        if (city) {
            checkWeather(city);
        }
    }
});
