import request from "supertest";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import app from "../src/app.js";

describe("Historial de logs del usuario", () => {
  let token;
  let userId;

  const userData = {
    email: `juanlogtest${Date.now()}@gmail.com`,
    name: "juanlogtest",
    password: "password123",
  };

  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI);

    // Registro y login
    await request(app).post("/api/users/signup").send(userData);
    const loginRes = await request(app).post("/api/users/login").send({
      email: userData.email,
      password: userData.password,
    });

    token = loginRes.body.token;
    const decoded = jwt.decode(token);
    userId = decoded.id;

    // Realiza una acción protegida que registre un log
    await request(app)
      .post("/api/restaurants/getRestaurants")
      .set("Authorization", `Bearer ${token}`)
      .send({ location: "Bogotá" });
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it("✅ Debería devolver los logs del usuario autenticado", async () => {
    const res = await request(app)
      .get("/api/users/logs")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body[0]).toHaveProperty("action");
    expect(res.body[0]).toHaveProperty("timestamp");
  });
});
