// Database connection
const dotenv = require("dotenv");
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const db = require("./database/database");

// Routes
const DateRouter = require("./routes/DateRouter");
const AreaRouter = require("./routes/AreaRouter");
const JobRouter = require("./routes/JobRouter");
const JobModalityRouter = require("./routes/JobModality");
const PayRouter = require("./routes/PayRouter");
const UserRouter = require("./routes/UserRouter");
const RoleRouter = require("./routes/RoleRouter");
const JobDetailsRouter = require("./routes/JobDetailRouter");
const StudentCertificateRouter = require("./routes/StudentCertificateRouter");

// Models
require("./models/DateModel");
require("./models/UserModel");
require("./models/JobModel");
require("./models/PayModel");
require("./models/AreaModel");
require("./models/JobModalityModel");
require("./models/JobDetailModel");
require("./models/CorrectionModel");
require("./models/StudentCertificateModel");

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
app.use("/api/clicap/date/", DateRouter);
app.use("/api/clicap/area/", AreaRouter);
app.use("/api/clicap/job/", JobRouter);
app.use("/api/clicap/jobdetails/", JobDetailsRouter);
app.use("/api/clicap/jobmodality/", JobModalityRouter);
app.use("/api/clicap/pay/", PayRouter);
app.use("/api/clicap/user/", UserRouter);
app.use("/api/clicap/role/", RoleRouter);
app.use("/api/clicap/student/", StudentCertificateRouter);

//SYNC -> sync with the database, if the model matches the table.
db.sync({ force: false })
  .then(() => {
    console.log("Database connected...");
  })
  .catch((error) => {
    console.log(error);
  });
