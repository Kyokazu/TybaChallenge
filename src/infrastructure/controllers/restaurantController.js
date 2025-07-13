import { getZoneRestaurants } from "../../application/usecases/getZoneRestaurants.js";

//Controller de restaurantes
export const getRestaurantsController = async (req, res) => {
  try {
    //Obtengo ubicación y userId
    const { location } = req.body;
    const userId = req.user.id;
    //Verifico que no esté vacio
    if (!location) {
      return res.status(400).json({ error: "No se ingresó una ubicación" });
    }
    //Obtengo los restaurantes
    const restaurants = await getZoneRestaurants({ location, userId });
    res.status(200).json(restaurants);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
