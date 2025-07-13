import { getZoneRestaurants } from "../../application/usecases/getZoneRestaurants.js";

export const getRestaurantsController = async (req, res) => {
  try {
    const { location } = req.body;
    const userId = req.user.id;

    if (!location) {
      return res.status(400).json({ error: "No se ingresó una ubicación" });
    }

    const restaurants = await getZoneRestaurants({ location, userId });
    res.status(200).json(restaurants);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
