import mongoose from "mongoose";
import { getZoneRestaurants } from "../src/application/usecases/getZoneRestaurants.js";

describe("Consultas reales a Google API", () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI);
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

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
