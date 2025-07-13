import request from "supertest";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import app from "../src/app.js";
import { tokenBlacklist } from "../src/infrastructure/database/models/tokenBlacklist.js";

describe("Rutas protegidas", () => {
  //Genero un usuario de test
  const userData = {
    email: `juanRouteTest${Date.now()}@gmail.com`,
    name: "juanRouteTest",
    password: "12345678",
  };
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI);

    // Registramos el usuario
    await request(app).post("/api/users/signup").send(userData);

    // Logueamos y obtenemos token
    const res = await request(app).post("/api/users/login").send({
      email: userData.email,
      password: userData.password,
    });

    token = res.body.token;
    decoded = jwt.decode(token);
    expiredAt = new Date(decoded.exp * 1000);
  });
  afterAll(async () => {
    await mongoose.connection.close();
  });

  //Caso de Prueba: Verificamos que la petición sin token falle
  it("Error por petición sin token", async () => {
    const res = await request(app)
      .post("/api/restaurants/getRestaurants")
      .send({ location: "Bogotá" });

    expect(res.statusCode).toBe(401);
    expect(res.body).toHaveProperty("message", "Token no proporcionado");
  });
  //Caso de Prueba: Verificamos que la petición con token sea exitosa
  it(" Consulta válida con token válido", async () => {
    const res = await request(app)
      .post("/api/restaurants/getRestaurants")
      .set("Authorization", `Bearer ${token}`)
      .send({ location: "Bogotá" });

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  // Caso de Prueba: Verificamos que la petición con token inválido falle.
  it("Error por acceso con token invalido/logout", async () => {
    // Simulamos logout agregando el token a la blacklist
    await tokenBlacklist.create({ token, expiredAt });
    const resp = await request(app)
      .get("/api/users/logout")
      .set("Authorization", `Bearer ${token}`);
    const res = await request(app)
      .post("/api/restaurants/getRestaurants")
      .set("Authorization", `Bearer ${token}`)
      .send({ location: "Bogotá" });

    expect(res.statusCode).toBe(403);
    expect(res.body).toHaveProperty("message", "Token inválido por logout");
  });
});
