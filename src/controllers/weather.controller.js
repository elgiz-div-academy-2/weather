const cityService = require("../services/city.service");
const weatherService = require("../services/weather.service");

const getWeatherList = async (req, res) => {
  res.json(await weatherService.getWeatherList(req.query));
};

const getCityWeatherList = async (req, res) => {
  let city = await cityService.getCityByName(req.params.city);
  if (!city) return res.status(404).json({ error: "City is not found" });

  return res.json(
    await weatherService.getWeatherList(
      { city: city.name },
      { ignoreDate: true }
    )
  );
};

const weatherController = {
  getWeatherList,
  getCityWeatherList,
};

module.exports = weatherController;
