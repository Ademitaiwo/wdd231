const apiKey = "YOUR_API_KEY";
const lat = 6.5745;     // Igando
const lon = 3.2514;

async function getWeather() {
    const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts&appid=${apiKey}&units=imperial`;

    const response = await fetch(url);
    const data = await response.json();

    // --- CURRENT WEATHER ---
    document.getElementById("currentTemp").textContent = Math.round(data.current.temp);
    document.getElementById("weatherDescription").textContent = data.current.weather[0].description;
    document.getElementById("humidity").textContent = data.current.humidity;
    document.getElementById("high").textContent = Math.round(data.daily[0].temp.max);
    document.getElementById("low").textContent = Math.round(data.daily[0].temp.min);

    document.getElementById("sunrise").textContent = new Date(data.current.sunrise * 1000).toLocaleTimeString();
    document.getElementById("sunset").textContent = new Date(data.current.sunset * 1000).toLocaleTimeString();

    // icon
    const icon = data.current.weather[0].icon;
    document.getElementById("weather-icon").src = `https://openweathermap.org/img/wn/${icon}@2x.png`;
    document.getElementById("captionDesc").textContent = data.current.weather[0].main;

    // --- FORECAST ---
    const days = ["Today", "Tomorrow", "Next Day"];

    document.getElementById("day1").textContent = days[0];
    document.getElementById("todayForecast").textContent = Math.round(data.daily[0].temp.day);

    document.getElementById("day2").textContent = days[1];
    document.getElementById("tomorrowForecast").textContent = Math.round(data.daily[1].temp.day);

    document.getElementById("day3").textContent = days[2];
    document.getElementById("dayAfterForecast").textContent = Math.round(data.daily[2].temp.day);
}

getWeather();
