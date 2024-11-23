const cityService = require("../services/city.service");

const getCities = async (req, res) => res.json(await cityService.getCities());
const getCity = async (req, res) => {
  let result = await cityService.getCity(req.params.id);

  if (!result) return res.status(404).json({ error: "City is not fund" });
  res.json(result);
};
const createCity = async (req, res) => {
  const body = req.body;
  const { name } = body;

  if (name?.trim().length < 3)
    return res.status(400).json({ error: "City name must be greater than 3" });

  try {
    let result = await cityService.createCity(name);

    res.json({
      message: "City created successfully",
      city: result,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteCity = async (req, res) => {
  let result = await cityService.deleteCity(req.params.id);

  if (!result) return res.status(404).json({ error: "City is not found" });

  res.json({ message: "City deleted successfully" });
};

const cityController = {
  getCities,
  getCity,
  createCity,
  deleteCity,
};

module.exports = cityController;
