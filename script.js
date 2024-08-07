// import { futureForecast } from "./future.js";
const card = document.querySelector(
  ".future-card"
);
const hero = document.querySelector(".hero");
const articles =
  document.querySelectorAll(".articles");
const temp = document.querySelector(".temp");
const city = document.querySelector(".city");
const wind = document.querySelector(".wind");
const condition =
  document.querySelector(".condition");
const humidity =
  document.querySelector(".humidity");
const weatherIcon = document.querySelector(
  ".weather-icon"
);
const apiKey = "d0552aed6597258e5012b6d443bfb6f3";
// function to return the weather of the input of location
async function checkWeather() {
  try {
    let cityNameVal = document.querySelector(
      "#input-field"
    );
    const cityName = cityNameVal.value;
    if (cityName !== "") {
      const URL = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${cityName}&appid=${apiKey}`;

      const response = await fetch(URL);

      changes(response);
    } else {
      document.querySelector(
        ".error"
      ).style.display = "block";
    }
  } catch (error) {
    alert("Error fetching weather data", error);
  }
}
//function to get the current location
async function getLocation() {
  try {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } =
          position.coords;

        locationWeather(latitude, longitude);
      }
    );
  } catch (error) {
    console.error(
      "Error getting location:",
      error
    );
    alert("Error getting location");
  }
}
//function to get the weather of current location

const locationWeather = async (
  latitude,
  longitude
) => {
  const URL = `https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${latitude}&lon=${longitude}&appid=${apiKey}`;
  const response = await fetch(URL);

  changes(response);
};

//function for changes
async function changes(response) {
  if (response.status === 404) {
    document.querySelector(
      ".error"
    ).style.display = "block";
    document.querySelector(
      ".weather"
    ).style.display = "none";
  } else {
    const data = await response.json();

    //getting searched location coordinates
    const lat = data?.coord?.lat;
    const lon = data?.coord?.lon;
    // getForecast(lat, lon);
    futureForecast(lat, lon);
    document.querySelector(
      "footer"
    ).style.position = "static";
    card.style.display = "block";
    temp.innerHTML =
      Math.round(data?.main?.temp) + "°C";
    city.innerHTML = data?.name;
    wind.innerHTML =
      Math.round(data?.wind?.speed) + " km/h";
    humidity.innerHTML =
      data?.main?.humidity + "%";
    condition.innerHTML =
      data?.weather[0]?.description;
    switch (data?.weather[0]?.main) {
      case "Mist":
        weatherIcon.src = "images/mist.png";
        break;
      case "Snow":
        weatherIcon.src = "images/snow.png";
        break;
      case "Rain":
        weatherIcon.src = "images/rain.png";
        break;
      case "Clouds":
        weatherIcon.src = "images/clouds.png";
        break;
      case "Drizzle":
        weatherIcon.src = "images/drizzle.png";
        break;
      case "Clear":
        weatherIcon.src = "images/clear.png";
        break;
      default:
        weatherIcon.src = "images/clear.png";
        break;
    }
    document.querySelector(
      ".weather"
    ).style.display = "block";
    document.querySelector(
      ".error"
    ).style.display = "none";
  }
}
//for greeting it will take the current location and show the greeting according to the time
function getTime() {
  const now = new Date();
  const hours = now.getHours();
  let greeting;
  if (hours < 12) {
    greeting = '"Good Morning"';
  } else if (hours < 18) {
    greeting = '"Good Afternoon"';
  } else if (hours < 20) {
    greeting = '"Good Evening"';
  } else {
    greeting = '"Good Night"';
  }
  document.getElementById(
    "greeting"
  ).innerHTML = `${greeting}, Welcome!`;
}
getTime();

//function for daily forecast

const btn = document.getElementById(
  "forecast-button"
);
btn.onclick = function showArticles() {
  articles.forEach((article) => {
    if (
      !article.style.display ||
      article.style.display == "none"
    ) {
      article.style.display = "flex";
      document.getElementById("btn-img").src =
        "images/arrow-up.png";
    } else {
      article.style.display = "none";
      document.getElementById("btn-img").src =
        "images/arrow-down.png";
    }
  });
};
