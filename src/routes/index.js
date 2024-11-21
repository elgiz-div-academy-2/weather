const { Router } = require("express");
const weatherRouter = require("./weather.router");
const cityRouter = require("./city.router");

const router = Router();

router.use("/weather", weatherRouter);
router.use("/city", cityRouter);

module.exports = router;
