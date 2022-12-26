const AreaModel = require("../models/AreaModel");
const JobModel = require("../models/JobModel");
const { PAGE_LIMIT } = process.env;
const multer = require("multer");
const path = require("path");
const UserModel = require("../models/UserModel");
const Sequelize = require("sequelize");
const JobModalityModel = require("../models/JobModalityModel");
const fs = require("fs");
const CorrectionModel = require("../models/CorrectionModel");
const excelJS = require("exceljs");
const EXCEL_CELL_WIDTH = 12;
const { calcNumOffset, calcTotalPages } = require("../helpers/helpers");
//NODEMAILER
const nodemailer = require("nodemailer");
const hbs = require("nodemailer-express-handlebars");
const uuid = require("uuid");
const JobDetailModel = require("../models/JobDetailModel");

var jobUUID;

var transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_APP,
    pass: "ifctzypbifginnzc",
  },
});

transporter.use(
  "compile",
  hbs({
    viewEngine: {
      extName: ".handlebars",
      partialsDir: path.resolve("./views"),
      defaultLayout: false,
    },
    viewPath: path.resolve("./views"),
    extName: ".handlebars",
  })
);

// Multer Config
const storage = multer.diskStorage({
  destination: path.join(__dirname, "../public/documents"),
  filename: (req, file, cb) => {
    jobUUID = uuid.v4() + path.extname(file.originalname);
    cb(null, jobUUID);
  },
});
const uploadJob = multer({
  storage,
  limits: { fileSize: 1000000 },
}).single("urlFile");

exports.upload = async (req, res) => {
  uploadJob(req, res, async (err) => {
    if (err) {
      err.message = "The file is so heavy for my service";
      return res.send(err);
    }
    const { name, areaId, authorId, members, jobModalityId } = req.body;
    // status 1 = Corregido | 0 = No corregido
    const status = 0;
    let { evaluatorId1, evaluatorId2 } = req.body;

    if (evaluatorId1 === "") {
      evaluatorId1 = null;
    }
    if (evaluatorId2 === "") {
      evaluatorId2 = null;
    }
    console.log(req.body);

    const doc = await JobModel.create({
      name: name,
      jobModalityId,
      areaId: areaId,
      members: members,
      authorId: Number(authorId),
      status: null,
      urlFile: jobUUID,
      evaluatorId1,
      evaluatorId2,
      approve: 0,
    });
    if (doc) {
      return res.status(200).json({ msg: "Trabajo creado!" });
    } else {
      return res.status(500).json({ msg: "Error al crear el Trabajo." });
    }
  });
};
exports.downloadFile = (req, res) => {
  console.log("Descargo el archivo");
  const { nameFile, folder } = req.query;
  try {
    const ruta = path.join(__dirname, `../public/${folder}/${nameFile}`);
    const file = fs.createReadStream(ruta);
    const filename = new Date().toISOString();
    res.setHeader(
      "Content-Disposition",
      'attachment: filename="' + filename + '"'
    );
    file.pipe(res);
  } catch (error) {
    return res.status(500).json({ msg: "Error al descargar el archivo." });
  }
};

exports.create = async (req, res) => {
  const { name, areaId, authorId, members, evaluatorId1, evaluatorId2 } =
    req.body;
  const doc = await JobModel.create({
    name: name,
    areaId: areaId,
    members: members,
    authorId: authorId,
    urlFile: req.file.filename,
    evaluatorId1: evaluatorId1,
    evaluatorId2: evaluatorId2,
  });
  console.log(members);
  if (doc) {
    res.status(200).send("Trabajo creado!");
  } else {
    res.status(500).json({ msg: "Error al crear el Trabajo." });
  }
};
exports.updateById = async (req, res) => {
  const Op = Sequelize.Op;
  let assignEvaluators = [];
  const { id } = req.params;
  let {
    name,
    areaId,
    authorId,
    members,
    urlFile,
    status,
    evaluatorId1,
    evaluatorId2,
  } = req.body;
  console.log(req.body);

  //verify that if evaluators are empty if not search de user email
  if (evaluatorId1 === "") {
    evaluatorId1 = null;
  } else {
    assignEvaluators.push({ id: Number(evaluatorId1) });
  }

  if (evaluatorId2 === "") {
    evaluatorId2 = null;
  } else {
    assignEvaluators.push({ id: Number(evaluatorId2) });
  }

  const doc = await JobModel.update(
    {
      name: name,
      areaId: areaId,
      members: members,
      authorId: authorId,
      status,
      urlFile: urlFile,
      evaluatorId1: evaluatorId1,
      evaluatorId2: evaluatorId2,
    },
    { where: { id: id } }
  );
  let options = {
    where: {},
    attributes: ["name", "email"],
  };

  if (doc) {
    if (assignEvaluators.length) {
      options.where = {
        [Op.or]: assignEvaluators,
      };
      //search user email
      const user = await UserModel.findAll(options);

      //send email with your configuration
      user.forEach((evaluator, i) => {
        var mailOptions = {
          from: process.env.EMAIL_APP,
          to: user[i].email,
          subject: "Nueva corrección",
          template: "mailAssignToJob",
          attachments: [
            {
              filename: "appLogo.jpg",
              path: "./public/logos/appLogo.jpg",
              cid: "logo", //my mistake was putting "cid:logo@cid" here!
            },
          ],
          context: {
            evaluatorName: user[i].name + user[i].surname,
            jobName: doc.name,
          },
        };
        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            return res.status(500).json({ msg: error.message });
          } else {
            console.log("Email enviado!");
            res.end();
          }
        });
      });
      return res.status(200).json({ msg: "Evaluador asignado!" });
    }
    res.status(200).json({ msg: "Trabajo editado!" });
  } else {
    res.status(500).json({ msg: "El Trabajo no existe!" });
  }
};
exports.getById = async (req, res) => {
  const { id } = req.params;
  const doc = await JobModel.findAll({
    where: { id },
    include: [
      { model: AreaModel },
      { model: JobModalityModel },
      { model: UserModel, as: "author" },
      { model: UserModel, as: "evaluator1" },
      { model: UserModel, as: "evaluator2" },
    ],
  });

  if (doc) {
    res.status(200).json({ response: doc });
  } else {
    res.status(500).json({ msg: "Error al obtener el Trabajo." });
  }
};
exports.getAll = async (req, res) => {
  const doc = await JobModel.findAll({
    include: [
      { model: UserModel, as: "author" },
      { model: CorrectionModel, as: "jobStatus" },
      { model: AreaModel },
      { model: UserModel, as: "evaluator1" },
      { model: UserModel, as: "evaluator2" },
    ],
  });
  if (doc) {
    res.status(200).json({ response: doc });
  } else {
    res.status(500).json({ msg: "Error al obtener los Trabajos." });
  }
};
exports.deleteById = async (req, res) => {
  const { id } = req.params;

  const corrections = await JobDetailModel.destroy({
    where: { jobId: id },
  });

  const doc = await JobModel.destroy({
    where: { id: id },
  });

  if (doc) {
    res.status(200).send("Trabajo eliminado!");
  } else {
    res.status(500).json({ msg: "Error al eliminar el Trabajo." });
  }
};

exports.getAllPaginated = async (req, res) => {
  const {
    authorId,
    name,
    surname,
    status,
    areaId,
    evaluatorId,
    approve,
    jobModalityId,
  } = req.query;
  console.log(req.query);
  const { page } = req.params;
  const Op = Sequelize.Op;
  const offsetIns = calcNumOffset(page);
  let options = {
    where: {},
    include: [
      { model: AreaModel },
      { model: JobModalityModel },
      {
        model: UserModel,
        as: "author",
        attributes: ["name", "surname"],
      },
      { model: CorrectionModel, as: "jobStatus" },
      { model: UserModel, as: "evaluator1", attributes: ["name", "surname"] },
      { model: UserModel, as: "evaluator2", attributes: ["name", "surname"] },
    ],
    offset: offsetIns,
    limit: Number(PAGE_LIMIT),
  };

  if (name) {
    options.where.name = {
      [Op.like]: `%${name}%`,
    };
  }
  if (surname) {
    options.where.surname = {
      [Op.like]: `%${surname}%`,
    };
  }
  if (authorId) {
    options.where.authorId = authorId;
  }
  if (jobModalityId) {
    options.where.jobModalityId = jobModalityId;
  }
  if (status) {
    options.where.status = status;
  }
  if (approve) {
    options.where.approve = approve;
  }

  if (evaluatorId) {
    options.where = {
      [Op.or]: [{ evaluatorId1: evaluatorId }, { evaluatorId2: evaluatorId }],
    };
  }
  if (areaId) {
    options.where.areaId = areaId;
  }
  /* options.where = {
      [Op.or]: [
        { name: { [Op.like]: `%${name}%` } },
        { "$partner.name$": { [Op.like]: `%${name}%` } },
      ],
    }; */
  /*   if (sinceDateStart && untilDateStart) {
    options.where.startDate = {
      [Op.between]: [sinceDateStart, untilDateStart],
    };
  }
  if (sinceDateEnd && untilDateEnd) {
    options.where.endDate = { [Op.between]: [sinceDateEnd, untilDateEnd] };
  } */

  const { count, rows } = await JobModel.findAndCountAll(options);
  const cantPages = calcTotalPages(count);

  if (rows) {
    res.status(200).json({ pages: cantPages, response: rows });
  } else {
    res.status(500).json({ msg: "La instancia no existe." });
  }
};

exports.setStatusJob = async (req, res) => {
  const { id } = req.params;
  const status = 1;
  const doc = await JobModel.update(
    {
      status,
    },
    { where: { id: id } }
  );
  if (doc) {
    res.status(200).json({ msg: "Trabajo corregido!" });
  } else {
    res.status(500).json({ msg: "El Trabajo no existe!" });
  }
};
const optionsToFilter = (req) => {
  try {
    const Op = Sequelize.Op;
    const {
      authorId,
      name,
      surname,
      status,
      areaId,
      evaluatorId,
      approve,
      jobModalityId,
    } = req.query;

    console.log(req.query);

    let options = {
      where: {},
      include: [
        { model: AreaModel },
        { model: JobModalityModel },
        {
          model: UserModel,
          as: "author",
          attributes: ["name", "surname"],
        },
        { model: CorrectionModel, as: "jobStatus" },
        { model: UserModel, as: "evaluator1", attributes: ["name", "surname"] },
        { model: UserModel, as: "evaluator2", attributes: ["name", "surname"] },
      ],
    };

    if (name) {
      options.where.name = {
        [Op.like]: `%${name}%`,
      };
    }
    if (surname) {
      options.where.surname = {
        [Op.like]: `%${surname}%`,
      };
    }
    if (authorId) {
      options.where.authorId = authorId;
    }
    if (jobModalityId) {
      options.where.jobModalityId = jobModalityId;
    }
    if (status) {
      options.where.status = status;
    }
    if (approve) {
      options.where.approve = approve;
    }

    if (evaluatorId) {
      options.where = {
        [Op.or]: [{ evaluatorId1: evaluatorId }, { evaluatorId2: evaluatorId }],
      };
    }
    if (areaId) {
      options.where.areaId = areaId;
    }
    return options;
  } catch (e) {
    console.log(e);
    return res.status(503).json({ msg: "Fallo en el servidor" });
  }
};
exports.downloadFilter = async (req, res) => {
  const options = optionsToFilter(req);
  const rows = await JobModel.findAll(options);
  console.log(rows);
  const workbook = new excelJS.Workbook(); // Create a new workbook
  const worksheet = workbook.addWorksheet("Mi reporte"); // New Worksheet
  // Column for data in excel. key must match data key
  worksheet.columns = [
    { header: "Autor", key: "author", width: EXCEL_CELL_WIDTH },
    { header: "Título", key: "name", width: EXCEL_CELL_WIDTH },
    { header: "Miembros", key: "members", width: EXCEL_CELL_WIDTH },
    { header: "Evaluador 1", key: "evaluator1", width: EXCEL_CELL_WIDTH },
    { header: "Evaluador 2", key: "evaluator2", width: EXCEL_CELL_WIDTH },
    { header: "Área", key: "area", width: EXCEL_CELL_WIDTH },
    { header: "Modalidad", key: "modality", width: EXCEL_CELL_WIDTH },
    { header: "Estado", key: "status", width: EXCEL_CELL_WIDTH },
  ];
  // Looping through User data
  rows.forEach((job) => {
    job.author = job.author.name + " " + job.author.surname;
    job.evaluator1 =
      job.evaluatorId1 != null
        ? job.evaluator1.name + " " + job.evaluator1.surname
        : null;
    job.evaluator2 =
      job.evaluatorId2 != null
        ? job.evaluator2.name + " " + job.evaluator2.surname
        : "";
    job.area = job.area.name;
    job.modality = job.jobmodality.name;
    job.status = job.status != null ? job.jobStatus.name : null;
    worksheet.addRow(job); // Add data in worksheet
  });
  // put styles
  worksheet.getRow(1).eachCell((cell) => {
    (cell.font = { bold: true }),
      (cell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: {
          argb: "FF9966",
        },
        bgColor: {
          argb: "FF000000",
        },
      }),
      (cell.border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      });
  });
  worksheet.getRow(1).eachCell((cell) => {
    (cell.font = { bold: true }),
      (cell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: {
          argb: "FF9966",
        },
        bgColor: {
          argb: "FF000000",
        },
      }),
      (cell.border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      });
  });
  rows.forEach((element, i) => {
    worksheet.getRow(i + 2).eachCell((cell) => {
      cell.border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };
    });
  });
  //header to download
  res.setHeader(
    "Content-Type",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  );
  res.setHeader("Content-Disposition", "attachment; filename=reporte.xlsx");
  try {
    return await workbook.xlsx.write(res).then(() => {
      res.status(200).end();
    });
  } catch (err) {
    res.send("Error al descargar");
  }
};
