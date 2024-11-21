const dotenv = require("dotenv");
const path = require("path");

const envPath = path.join(__dirname, "../../.env");

dotenv.config({ path: envPath });

module.exports = {
  port: process.env.PORT,
  databaseURL: process.env.DATABASE_URL,
  weather: {
    url: process.env.WEATHER_API_URL,
    key: process.env.WEATHER_API_KEY,
  },
  forecastDays: 7,
};
