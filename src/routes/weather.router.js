const { Router } = require("express");
const weatherController = require("../controllers/weather.controller");

const weatherRouter = Router();

weatherRouter.get("/", weatherController.getWeatherList);
weatherRouter.get("/:city", weatherController.getCityWeatherList);

module.exports = weatherRouter;
