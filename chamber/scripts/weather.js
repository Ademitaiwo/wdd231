const apiKey = "YOUR_OPENWEATHERMAP_API_KEY";
const city = "Ibadan";
const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

async function fetchWeather() {
    const response = await fetch(url);
    const data = await response.json();

    const current = data.list[0];
    document.getElementById("temp").textContent = current.main.temp.toFixed(1);
    document.getElementById("description").textContent = current.weather[0].description;

    const forecastList = document.getElementById("forecast-list");
    forecastList.innerHTML = "";
    for (let i = 8; i < data.list.length; i += 8) { // roughly one per day
        const day = data.list[i];
        const li = document.createElement("li");
        li.textContent = `${new Date(day.dt_txt).toDateString()}: ${day.main.temp.toFixed(1)}°C`;
        forecastList.appendChild(li);
    }
}

fetchWeather();
