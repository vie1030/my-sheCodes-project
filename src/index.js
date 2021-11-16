function formatDate(now) {
  let min = now.getMinutes();
  if (min < 10) {
    min = `0${min}`;
  }
  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  let day = days[now.getDay()];
  let date = now.getDate();
  let month = months[now.getMonth()];
  let today = `${day} ${month}, ${date}/ ${hours}: ${min}`;
  return `${today} `;
}
let now = new Date();
let currentDate = document.querySelector("#current-time");
currentDate.innerHTML = formatDate(now);

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
let searchForm = document.querySelector("#searchForm");
searchForm.addEventListener("submit", handleSubmit);

function showTemperature(response) {
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
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
  document.querySelector("#sunShine").innerHTML = response.data.sys.sunrise;
  document.querySelector("#sunDown").innerHTML = response.data.sys.sunset;
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

searchCity("Tokyo");
