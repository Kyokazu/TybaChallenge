import express from 'express';
import dotev from 'dotenv';
import mongoose from 'mongoose';
import userRoutes from './routes/userRoutes.js';


// Configuramos el entorno 
dotev.config();
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use("/api/users",userRoutes);

app.get("/", (req, res) => {
    res.send("Welcome to Tyba Challenge");
});

//Configuración a la persistencia (En este caso, usaremos mongo a través de mongoose)

mongoose.connect(process.env.MONGO_URI)
.then(() => {
    app.listen(port, () => {
        console.log(`Server running on port: ${port}`);
    });
})
.catch((error) => console.log("Error en la conexión a MongoDB", error));

