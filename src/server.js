// server.js
import mongoose from "mongoose";
import app from "./app.js";

const port = process.env.PORT || 3000;

mongoose.connect(process.env.MONGO_URI).then(() => {
  app.listen(port, () => {
    console.log(`Servidor corriendo en puerto ${port}`);
  });
});
