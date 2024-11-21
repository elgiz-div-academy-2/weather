const { Schema, model } = require("mongoose");

const cityWeatherSchema = new Schema(
  {
    city: {
      type: String,
      required: true,
    },
    temperature: {
      type: Number,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const cityWeatherModel = model("CityWeather", cityWeatherSchema);

module.exports = cityWeatherModel;
