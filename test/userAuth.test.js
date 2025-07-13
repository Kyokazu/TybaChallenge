import request from "supertest";
import mongoose from "mongoose";
import app from "../src/app.js";

describe("Auth enpoints", () => {
  //Genero un usuario de test
  const userData = {
    email: `Juan${Date.now()}@gmail.com`,
    name: "Juan",
    password: "123456",
  };
  //Me aseguro que se realice la conexión
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI);
  });

  //Libero la conexión cuando termine todos los test
  afterAll(async () => {
    await mongoose.connection.close();
  });

  //Caso de prueba: Registrar exitosamente un usuario
  it("Debería registrar un usuario y devolver un objeto con sus datos", async () => {
    const response = await request(app)
      .post("/api/users/signup")
      .send(userData);

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("name", userData.name);
    expect(response.body).toHaveProperty("email", userData.email);
  });

  //Caso de Prueba: Loguear exitosamente un usuario
  it("Debería loguear un usuario y devolver un token", async () => {
    const response = await request(app).post("/api/users/login").send({
      email: userData.email,
      password: userData.password,
    });

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("token");
  });
});
