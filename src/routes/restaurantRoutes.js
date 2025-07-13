import express from "express";
import { getRestaurantsController } from "../infrastructure/controllers/restaurantController.js";
import { authJwt } from "../middleware/authJwt.js";

//Router de restaurantes

const router = express.Router();

router.post("/getRestaurants", authJwt, getRestaurantsController);

export default router;
