const { Router } = require("express");
const weatherController = require("../controllers/weather.controller");

const weatherRouter = Router();

weatherRouter.get("/", weatherController.getWeatherList);
weatherRouter.get("/:city", () => {});

module.exports = weatherRouter;
