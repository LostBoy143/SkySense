const date = document.querySelectorAll(".date");
const des = document.querySelectorAll(".day");
const high = document.querySelectorAll(".high");
const low = document.querySelectorAll(".low");
const key = "de415dabbdb8424e8f587ddd756d520b";

async function futureForecast(lat, lon) {
  const URL = `https://api.weatherbit.io/v2.0/forecast/daily?&lat=${lat}&lon=${lon}&key=${key}`;
  const response = await fetch(URL);
  const data = await response.json();
  console.log(data);

  date.forEach((date, i) => {
    date.textContent = data?.data[i]?.datetime;

    i++;
  });

  des.forEach((des, i) => {
    des.textContent =
      data?.data[i]?.weather?.description;
  });

  high.forEach((high, i) => {
    high.textContent =
      Math.round(data?.data[i]?.high_temp) + "°C";
    i++;
  });

  low.forEach((low, i) => {
    low.textContent =
      Math.round(data?.data[i]?.low_temp) + "°C";
    i++;
  });
}
async function weatherAlerts() {
  const URL = `https://api.weatherbit.io/v2.0/alerts?lat=39.75895&lon=-84.19161&key=${key}`;
  const response = await fetch(URL);
  const data = await response.json();
  console.log(data);
}
weatherAlerts();
