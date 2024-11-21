const weatherService = require("../services/weather.service");

const getWeatherList = async (req, res) => {
  res.json(await weatherService.getWeatherList());
};

const weatherController = {
  getWeatherList,
};

module.exports = weatherController;
