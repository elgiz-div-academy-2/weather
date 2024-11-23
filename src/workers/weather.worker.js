const { CronJob } = require("cron");
const config = require("../config");

const cityService = require("../services/city.service");
const weatherService = require("../services/weather.service");

const weatherWorkerHandler = async () => {
  let cities = await cityService.getCities();
  for (let city of cities) {
    await weatherService.deleteOutdatedWeather(city.name);
    await weatherService.createCityWeather(city.name);
  }
};

const job = new CronJob("0 0 * * *", weatherWorkerHandler);

weatherWorkerHandler();

job.start();
