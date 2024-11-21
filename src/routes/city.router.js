const { Router } = require("express");
const cityController = require("../controllers/city.controller");

const cityRouter = Router();

cityRouter.get("/", cityController.getCities);
cityRouter.get("/:id", cityController.getCity);
cityRouter.post("/", cityController.createCity);
cityRouter.delete("/:id", cityController.deleteCity);

module.exports = cityRouter;
