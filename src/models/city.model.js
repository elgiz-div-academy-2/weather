const { Schema, model } = require("mongoose");

const citySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

const cityModel = model("city", citySchema);

module.exports = cityModel;
