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
function formatDailyForecast(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function showForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
           <div class="col-2">
                <div class="forecast-date">${formatDailyForecast(
                  forecastDay.dt
                )}</div>
               
                <img
                  src="https://openweathermap.org/img/wn/${
                    forecastDay.weather[0].icon
                  }@2x.png"
                  alt=""
                  width="40"
                />
                <div class="forecast-temperature">
                  <span class="forecast-temp-max">${Math.round(
                    forecastDay.temp.max
                  )}°</span>
                  <span class="forecast-temp-min">${Math.round(
                    forecastDay.temp.min
                  )}°</span>
                </div>
          </div>
    `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "867dcf6bb3756e0001b67ad06b6f1ecd";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showForecast);
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

  document.querySelector("#highLowTemperature").innerHTML = `${Math.round(
    response.data.main.temp_max
  )}°C/${response.data.main.temp_min}°C`;

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

  getForecast(response.data.coord);
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

let currentLocationBnt = document.querySelector("#current-location-button");
currentLocationBnt.addEventListener("click", currentPossition);

let searchForm = document.querySelector("#searchForm");
searchForm.addEventListener("submit", handleSubmit);

searchCity("Tokyo");
