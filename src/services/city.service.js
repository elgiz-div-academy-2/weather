const cityModel = require("../models/city.model");
const { checkCityName } = require("./weather-api.service");
const weatherService = require("./weather.service");

const getCities = () => cityModel.find();

const getCity = (id) => {};

const createCity = async (name) => {
  let isNameValid = await checkCityName(name);
  if (!isNameValid) throw new Error("City name is not found or not valid");
  try {
    let city = await cityModel.create({
      name,
    });
    await city.save();

    weatherService.createCityWeather(name);

    return city;
  } catch (err) {
    console.log(err);
    throw new Error("City already exists");
  }
};

const deleteCity = (id) => {};

const cityService = {
  getCities,
  getCity,
  createCity,
  deleteCity,
};

module.exports = cityService;
