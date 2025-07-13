import express from "express";
import dotev from "dotenv";
import userRoutes from "./routes/userRoutes.js";
import restaurantRoutes from "./routes/restaurantRoutes.js";

// Configuramos el entorno
dotev.config();
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/restaurants", restaurantRoutes);
app.get("/", (req, res) => {
  res.send("Welcome to Tyba Challenge");
});

export default app;
