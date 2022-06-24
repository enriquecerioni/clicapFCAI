//conexión a las base de datos
const dotenv = require("dotenv");
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const db = require("./database/database");
const UserModel = require("./models/UserModel")

dotenv.config({ path: "./.env" });

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

//Configuramos el puerto,  3000 o cualquiera que le asigne la maquina o el servidor
const API_PORT = process.env.API_PORT;
const PORT = process.env.PORT || API_PORT;

// La aplicacion escucha en el puerto
app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});

//SYNC -> sincroniza con la base de datos, si el modelo coincide con la tabla.
db.sync()
  .then(() => {
    console.log("Database connected...");
  })
  .catch((error) => {
    console.log(error);
  });
