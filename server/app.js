// Database connection
const dotenv = require("dotenv");
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const db = require("./database/database");

// Routes
const AreaRouter = require("./routes/AreaRouter");
const DocumentRouter = require("./routes/DocumentRouter");
const PayRouter = require("./routes/PayRouter");
const UserRouter = require("./routes/UserRouter");

// Models
require("./models/UserModel");
require("./models/DocumentModel");
require("./models/PayModel");
require("./models/AreaModel");

dotenv.config({ path: "./.env" });

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

// We configure the PORT,  3000 or anyone asigned by PC or the server
const API_PORT = process.env.API_PORT;
const PORT = process.env.PORT || API_PORT;

// The app listen to PORT
app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});

// URL Routes
app.use("/api/area/", AreaRouter);
app.use("/api/document/", DocumentRouter);
app.use("/api/pay/", PayRouter);
app.use("/api/user/", UserRouter);

//SYNC -> sync with the database, if the model matches the table.
db.sync()
  .then(() => {
    console.log("Database connected...");
  })
  .catch((error) => {
    console.log(error);
  });