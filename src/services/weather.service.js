const { format } = require("date-fns");
const config = require("../config");
const cityWeatherModel = require("../models/city-weather.model");
const { fetchWeather } = require("./weather-api.service");

const createCityWeather = async (cityName) => {
  let result = await fetchWeather(cityName, config.forecastDays);
  if (!result) return;

  for (let dayResult of result) {
    let date = dayResult.date;

    let currentData = await cityWeatherModel.findOne({
      date,
      city: cityName,
    });

    if (currentData) {
      currentData.temperature = dayResult.day.avgtemp_c;
      await currentData.save();

      console.log(`${cityName} for ${date} is updated`);
    } else {
      let cityWeather = await cityWeatherModel.create({
        city: cityName,
        temperature: dayResult.day.avgtemp_c,
        date,
      });
      await cityWeather.save();
      console.log(`${cityName} for ${date} is created`);
    }
  }
};

const getWeatherList = async () => {
  let date = format(new Date(), "yyyy-MM-dd");
  let list = await cityWeatherModel.find({ date });
  return list;
};

const weatherService = {
  createCityWeather,
  getWeatherList,
};

module.exports = weatherService;
