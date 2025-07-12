const weatherForm = document.querySelector(".weatherForm");
const cityInput = document.querySelector(".cityInput");
const card = document.querySelector(".card");
const apiKey = "bd5e378503939ddaee76f12ad7a97608";

weatherForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const city = cityInput.value.trim();

  if (city) {
    try {
      const weatherData = await getWeatherData(city);
      displayWeatherInfo(weatherData);
    } catch (error) {
      console.error(error);
      displayError("City not found. Please try again.");
    }
  } else {
    displayError("Please enter a city.");
  }
});

async function getWeatherData(city) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  const response = await fetch(apiUrl);
  if (!response.ok) {
    throw new Error("Weather data fetch failed");
  }
  return await response.json();
}

function displayWeatherInfo(data) {
  const city = data.name;
  const temperature = data.main.temp;
  const humidity = data.main.humidity;
  const description = data.weather[0].description;
  const weatherId = data.weather[0].id;
  const emoji = getWeatherEmoji(weatherId);

  card.innerHTML = `
    <h1 id="cityName">${city}</h1>
    <h1 id="temperature">${temperature.toFixed(1)}°C</h1>
    <h3 id="humidity">Humidity: ${humidity}%</h3>
    <h2 id="now">${description}</h2>
    <h1 id="sun">${emoji}</h1>
  `;

  card.style.display = "flex";
}

function getWeatherEmoji(weatherId) {
  if (weatherId >= 200 && weatherId < 300) return "⛈️";
  if (weatherId >= 300 && weatherId < 500) return "🌦️";
  if (weatherId >= 500 && weatherId < 600) return "🌧️";
  if (weatherId >= 600 && weatherId < 700) return "❄️";
  if (weatherId >= 700 && weatherId < 800) return "🌫️";
  if (weatherId === 800) return "☀️";
  if (weatherId > 800 && weatherId < 900) return "☁️";
  return "❓";
}

function displayError(message) {
  const errorDisplay = document.createElement("p");
  errorDisplay.textContent = message;
  errorDisplay.classList.add("errorDisplay");

  card.textContent = "";
  card.style.display = "flex";
  card.appendChild(errorDisplay);
}
