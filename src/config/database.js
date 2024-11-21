const mongoose = require("mongoose");
const config = require("./index");

const connect = () => {
  return mongoose
    .connect(config.databaseURL)
    .then(() => {
      console.log("Database connected successfully");
      return true;
    })
    .catch((err) => {
      console.error("Database connection failed", err);
      return false;
    });
};

module.exports = connect;
