import axios from "axios";
import { saveUserAction } from "../../infrastructure/database/models/actionsLog.js";

//Obtengo la Key y el endpoint de la API de Google.
export const getZoneRestaurants = async ({ location, userId }) => {
  const API_KEY = process.env.GOOGLE_API_KEY;
  const endpoint = "https://maps.googleapis.com/maps/api/place/textsearch/json";
  let response;
  var list;
  const query = "Restaurantes en " + location;
  //Verifico que exista un valor de ciudad/coordenada
  if (location) {
    //Primero verifico si viene en valor de coordenadas.
    if (location.lat && location.lng) {
      response = await axios.get(endpoint, {
        params: {
          location: `${location.lat},${location.lng}`,
          radius: 1500,
          type: "restaurant",
          key: API_KEY,
        },
      });
      list = response.data.results
        .filter((result) => result.types.includes("restaurant"))
        .map((result) => ({
          name: result.name,
          address: result.formatted_address,
        }));
      await saveUserAction(userId, `getRestaurants`);
      //Si no es coordenada, es una ciudad
    } else {
      response = await axios.get(endpoint, {
        params: {
          query,
          key: API_KEY,
        },
      });
      list = response.data.results
        .filter(
          (result) =>
            result.types.includes("restaurant") &&
            result.formatted_address.includes(location)
        )
        .map((result) => ({
          name: result.name,
          address: result.formatted_address,
        }));
      await saveUserAction(userId, `getRestaurants`);
    }
  }

  if (list.length > 0) {
    return list;
  }
  return { "Error:": "No se encontraron restaurantes en la zona" };
};
