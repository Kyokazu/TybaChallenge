import mongoose from "mongoose";
import { getZoneRestaurants } from "../src/application/usecases/getZoneRestaurants.js";

//Pruebas al consumo de la API
describe("Consultas reales a Google API", () => {
  // Me aseguro que se realice la conexión
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI);
  });
  //Libero la conexión cuando termine todos los test
  afterAll(async () => {
    await mongoose.connection.close();
  });
  //Caso de prueba: Obtener restaurantes en una ciudad existente, Bogotá en este caso.
  it("Debería retornar una lista de restaurantes reales en Bogotá", async () => {
    const result = await getZoneRestaurants({
      location: "Bogotá",
      userId: "test-user-id",
    });

    // Validar que se obtenga al menos un restaurante
    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBeGreaterThan(0);
    expect(result[0]).toHaveProperty("name");
    expect(result[0]).toHaveProperty("address");
  });
  // Caso de prueba: Intentar obtener restaurantes en una ciudad inexistente
  // Aplica también para coordenadas en que su radio establecido no encuentre ninguno
  it("Debería devolver error si no se encuentran restaurantes por ciudad inexistente", async () => {
    const result = await getZoneRestaurants({
      location: "TybaChallengeCity", // Ciudad inventada que no existe
      userId: "test-user-id",
    });

    expect(result).toEqual({
      "Error:": "No se encontraron restaurantes en la zona",
    });
  });
});
