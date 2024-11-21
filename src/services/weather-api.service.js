const axios = require("axios");
const { weather } = require("../config");

const api = axios.create({
  baseURL: weather.url,
});

api.interceptors.request.use((config) => {
  let url = config.url;
  if (url.includes("?")) {
    url += `&key=${weather.key}`;
  } else {
    url += `?key=${weather.key}`;
  }

  config.url = url;

  return config;
});

const checkCityName = async (cityName) => {
  let result = await api.get("search.json", {
    params: {
      q: cityName,
    },
  });

  if (!result?.data) return false;

  let findCity = result.data.find(
    (city) => city.name === cityName && city.country === "Azerbaijan"
  );

  if (!findCity) return false;

  return true;
};

const fetchCurrentWeather = async (cityName) => {
  try {
    let result = await api.get(`current.json?q=${cityName}`);

    return result.data?.current;
  } catch (err) {
    console.error("request failed with error", err);
    return false;
  }
};

const fetchWeather = async (cityName, day = 1) => {
  try {
    let result = await api.get(`forecast.json`, {
      params: {
        q: cityName,
        days: 7,
      },
    });

    return result.data?.forecast?.forecastday;
  } catch (err) {
    console.error("request failed with error", err);
    return false;
  }
};

module.exports = {
  checkCityName,
  fetchCurrentWeather,
  fetchWeather,
};
