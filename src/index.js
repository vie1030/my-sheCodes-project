function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];

  return `${day} ${hours}:${minutes}`;
}

function formatTime(timestamp) {
  let time = new Date(timestamp * 1000);
  let hours = time.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = time.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${hours}:${minutes}`;
}

function showTemperature(response) {
  document.querySelector("#current-date").innerHTML = formatDate(
    response.data.dt * 1000
  );
  celsiusTemperature = response.data.main.temp;
  document.querySelector("#temperature").innerHTML =
    Math.round(celsiusTemperature);

  document.querySelector("#decription").innerHTML =
    response.data.weather[0].description;

  let high = Math.round(response.data.main.temp_max);
  let low = Math.round(response.data.main.temp_min);
  document.querySelector(
    "#highLowTemperature"
  ).innerHTML = `${high}°C/${low}°C`;
  document.querySelector("#feelLike").innerHTML = Math.round(
    response.data.main.feels_like
  );

  document.querySelector("#sunShine").innerHTML = formatTime(
    response.data.sys.sunrise
  );
  document.querySelector("#sunDown").innerHTML = formatTime(
    response.data.sys.sunset
  );
  document.querySelector("#humid").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#city").innerHTML = response.data.name;

  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
}

function searchCity(city) {
  let apiKey = "867dcf6bb3756e0001b67ad06b6f1ecd";
  let apiWeatherMap = `https://api.openweathermap.org/data/2.5/weather?q`;
  let apiUrl = `${apiWeatherMap}=${city}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#searchTab").value;
  searchCity(city);
}

function showPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "867dcf6bb3756e0001b67ad06b6f1ecd";
  let apiWeatherMap = "https://api.openweathermap.org/data/2.5/weather?";
  let apiUrl = `${apiWeatherMap}lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showTemperature);
}
function currentPossition() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

function showFahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  celsiusElement.classList.remove("active");
  fahrenheitElement.classList.add("active");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function showCelsiusTemperature(event) {
  event.preventDefault();
  celsiusElement.classList.add("active");
  fahrenheitElement.classList.remove("active");
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let fahrenheitElement = document.querySelector("#fahrenheit-link");
fahrenheitElement.addEventListener("click", showFahrenheitTemperature);

let celsiusElement = document.querySelector("#celsius-link");
celsiusElement.addEventListener("click", showCelsiusTemperature);

let currentLocationBnt = document.querySelector("#current-location-button");
currentLocationBnt.addEventListener("click", currentPossition);

let searchForm = document.querySelector("#searchForm");
searchForm.addEventListener("submit", handleSubmit);

searchCity("Tokyo");
