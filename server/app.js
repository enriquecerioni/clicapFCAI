// Database connection
const dotenv = require("dotenv");
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const db = require("./database/database");

// Routes
const NewRouter = require("./routes/NewRouter");
const DateRouter = require("./routes/DateRouter");
const AreaRouter = require("./routes/AreaRouter");
const JobRouter = require("./routes/JobRouter");
const JobModalityRouter = require("./routes/JobModality");
const PayRouter = require("./routes/PayRouter");
const UserRouter = require("./routes/UserRouter");
const RoleRouter = require("./routes/RoleRouter");
const JobDetailsRouter = require("./routes/JobDetailRouter");
const StudentCertificateRouter = require("./routes/StudentCertificateRouter");
const FileRouter = require("./routes/FileRouter");
const JobModalityModel = require("./models/JobModalityModel");
const AreaModel = require("./models/AreaModel");
const RoleModel = require("./models/RoleModel");
const CorrectionModel = require("./models/CorrectionModel");
const CertificateRouter = require("./routes/CertificateRouter");
const UserModel = require("./models/UserModel");

// Models
require("./models/NewModel");
require("./models/DateModel");
require("./models/UserModel");
require("./models/JobModel");
require("./models/PayModel");
require("./models/AreaModel");
require("./models/JobModalityModel");
require("./models/JobDetailModel");
require("./models/CorrectionModel");
require("./models/StudentCertificateModel");
require("./models/CertificateModel");

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
app.use("/api/clicap/new/", NewRouter);
app.use("/api/clicap/date/", DateRouter);
app.use("/api/clicap/area/", AreaRouter);
app.use("/api/clicap/job/", JobRouter);
app.use("/api/clicap/jobdetails/", JobDetailsRouter);
app.use("/api/clicap/jobmodality/", JobModalityRouter);
app.use("/api/clicap/pay/", PayRouter);
app.use("/api/clicap/user/", UserRouter);
app.use("/api/clicap/role/", RoleRouter);
app.use("/api/clicap/student/", StudentCertificateRouter);
app.use("/api/clicap/file/", FileRouter);
app.use("/api/clicap/certificate/", CertificateRouter);

const insertData = async () => {
  const areas = ["Alimentos", "Química"];
  const roles = ["Admin", "Evaluador", "Docente Investigador", "Alumno"];
  const modality = ["Trabajo Completo", "Resumen"];
  const corrections = [
    "Aceptado",
    "Aceptado con modificaciones Menores",
    "Aceptado con modificaciones mayores",
    "No aceptado",
  ];
  const users = [
    {
      id: 1,
      roleId: 1,
      identifyType: "DNI",
      identifyNumber: 39601123,
      name: "Enrique",
      surname: "Cerioni",
      email: "enriquecerioni39@gmail.com",
      password:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXNzd29yZCI6ImNsaWNhcCIsImlhdCI6MTY3MTY4MTI2Nn0.ImXeeJI3cI4V11V3cwEvX7uhyZK1qZVihJ453HypYmw",
      address: "Las Heras 953",
      institution: "Universidad de Mendoza",
      phone: "2604626476",
      attendance: 0,
    },{
      id: 2,
      roleId: 2,
      identifyType: "DNI",
      identifyNumber: 123,
      name: "Fabian",
      surname: "Talio",
      email: "enriquecerioni39@gmail.com",
      password:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXNzd29yZCI6ImNsaWNhcCIsImlhdCI6MTY3MTY4MTI2Nn0.ImXeeJI3cI4V11V3cwEvX7uhyZK1qZVihJ453HypYmw",
      address: "Las Heras 953",
      institution: "Universidad de Mendoza",
      phone: "2604626476",
      attendance: 0,
    },{
      id: 3,
      roleId: 2,
      identifyType: "DNI",
      identifyNumber: 321,
      name: "Diego",
      surname: "Liseno",
      email: "enriquecerioni39@gmail.com",
      password:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXNzd29yZCI6ImNsaWNhcCIsImlhdCI6MTY3MTY4MTI2Nn0.ImXeeJI3cI4V11V3cwEvX7uhyZK1qZVihJ453HypYmw",
      address: "Las Heras 953",
      institution: "Universidad de Mendoza",
      phone: "2604626476",
      attendance: 0,
    }, {
      id: 4,
      roleId: 4,
      identifyType: "DNI",
      identifyNumber: 40072123,
      name: "Ivan",
      surname: "Castro",
      email: "enriquecerioni39@gmail.com",
      password:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXNzd29yZCI6ImNsaWNhcCIsImlhdCI6MTY3MTY4MTI2Nn0.ImXeeJI3cI4V11V3cwEvX7uhyZK1qZVihJ453HypYmw",
      address: "Las Heras 953",
      institution: "Universidad de Mendoza",
      phone: "2604626476",
      attendance: 0,
    },
  ];
  areas.forEach(async (item) => {
    await AreaModel.create({
      name: item,
    });
  });
  roles.forEach(async (item) => {
    await RoleModel.create({
      name: item,
    });
  });
  modality.forEach(async (item) => {
    await JobModalityModel.create({
      name: item,
    });
  });
  corrections.forEach(async (item) => {
    await CorrectionModel.create({
      name: item,
    });
  });

  users.forEach(async (item) => {
    await UserModel.create({
      id: item.id,
      roleId: item.roleId,
      identifyType: item.identifyType,
      identifyNumber: item.identifyNumber,
      name: item.name,
      surname: item.surname,
      email: item.email,
      password: item.password,
      address: item.address,
      institution: item.institution,
      phone: item.phone,
      attendance: item.attendance,
    });
  });
  return console.log("Database connected...");
};

//SYNC -> sync with the database, if the model matches the table.
db.sync()
  .then(() => {
    insertData();
    console.log("Database connected...");
  })
  .catch((error) => {
    console.log(error);
  });
