const cityWeatherModel = require("../models/city-weather.model");
const cityModel = require("../models/city.model");
const { checkCityName } = require("./weather-api.service");
const weatherService = require("./weather.service");

const getCities = () => cityModel.find();

const getCity = (id) => cityModel.findById(id);

const getCityByName = (name) =>
  cityModel.findOne({ name: new RegExp(name, "i") });

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

const deleteCity = async (id) => {
  let city = await getCity(id);
  if (!city) return false;

  await cityWeatherModel.deleteMany({ name: city.name });

  return await cityModel.deleteOne({ _id: id });
};

const cityService = {
  getCities,
  getCity,
  getCityByName,
  createCity,
  deleteCity,
};

module.exports = cityService;
