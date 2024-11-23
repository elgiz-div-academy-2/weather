const { format, differenceInDays } = require("date-fns");
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

const deleteOutdatedWeather = async (city) => {
  let list = await getWeatherList({ city }, { ignoreDate: true });
  for (let cityWeather of list) {
    let cityDate = new Date(cityWeather.date);
    if (differenceInDays(new Date(), cityDate) > 0) {
      await cityWeatherModel.deleteOne({ _id: cityWeather._id });
    }
  }
};

const getWeatherList = async (query = {}, { ignoreDate = false } = {}) => {
  let { date, city } = query;

  if (!date && !ignoreDate) date = format(new Date(), "yyyy-MM-dd");

  let where = {};

  if (date) {
    where.date = date;
  }
  if (city)
    where.city = {
      $regex: new RegExp(city, "i"),
    };

  let list = await cityWeatherModel.find(where);
  return list;
};

const weatherService = {
  createCityWeather,
  deleteOutdatedWeather,
  getWeatherList,
};

module.exports = weatherService;
