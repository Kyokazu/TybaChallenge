// server.js
import mongoose from "mongoose";
import app from "./app.js";

//Aislamos el server del app.js
// para poder usar app.js en los tests.

const port = process.env.PORT || 3000;

mongoose.connect(process.env.MONGO_URI).then(() => {
  app.listen(port, () => {
    console.log(`Servidor corriendo en puerto ${port}`);
  });
});
