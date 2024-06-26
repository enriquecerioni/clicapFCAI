const AreaModel = require("../models/AreaModel");
const JobModel = require("../models/JobModel");
const { PAGE_LIMIT } = process.env;
const multer = require("multer");
const path = require("path");
const UserModel = require("../models/UserModel");
const Sequelize = require("sequelize");
const JobModalityModel = require("../models/JobModalityModel");
const fs = require("fs");
const { transporter } = require("../utils/utils");
const CorrectionModel = require("../models/CorrectionModel");
const excelJS = require("exceljs");
const EXCEL_CELL_WIDTH = 12;
const { calcNumOffset, calcTotalPages } = require("../helpers/helpers");
const hbs = require("nodemailer-express-handlebars");
const uuid = require("uuid");
const JobDetailModel = require("../models/JobDetailModel");
const JobVersionModel = require("../models/JobVersionModel");

var jobUUID;

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

// Función para filtrar los archivos permitidos
const fileFilter = (req, file, cb) => {
  // Verifica si el archivo es de tipo doc o docx
  if (
    file.mimetype === "application/msword" ||
    file.mimetype ===
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  ) {
    // Permite el archivo
    cb(null, true);
  } else {
    // Rechaza el archivo con un mensaje de error
    cb(new Error("Error: el archivo debe ser de tipo doc o docx"), false);
  }
};

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
  fileFilter: fileFilter,
}).single("urlFile");

exports.upload = async (req, res) => {
  try {
    uploadJob(req, res, async (err) => {
      if (err) {
        return res.status(400).json({ msg: err.message });
      }
      const { name, areaId, userId, author, members, jobModalityId } = req.body;
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
        jobModalityId: Number(jobModalityId),
        areaId: Number(areaId),
        members: members,
        userId: Number(userId),
        author: author,
        status: null,
        evaluatorId1,
        evaluatorId2,
        approve: 0,
      });

      const user = await UserModel.findOne({
        where: { id: userId },
        attributes: ["name", "surname"],
      });

      const admins = await UserModel.findAll({
        where: { roleId: 1 },
        attributes: ["name", "surname", "email"],
      });

      if (doc) {
        admins.forEach((admin, i) => {
          let mailOptions = {
            from: process.env.EMAIL_APP,
            to: admin.email,
            subject: "Nuevo Trabajo Creado",
            template: "mailWithNewJobAdmin",
            attachments: [
              {
                filename: "appLogo.jpg",
                path: "./public/logos/appLogo.jpg",
                cid: "logo",
              },
            ],
            context: {
              adminName: admin.name + " " + admin.surname,
              jobName: doc.name,
              userName: user.name + " " + user.surname,
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
      }

      // Creamos la primera version del trabajo

      await JobVersionModel.create({
        jobId: doc?.id,
        versionNumber: 1,
        urlFile: jobUUID,
      });

      if (doc) {
        return res.status(200).json({ msg: "Trabajo creado!" });
      } else {
        return res.status(500).json({ msg: "Error al crear el Trabajo." });
      }
    });
  } catch (error) {
    return res.status(400).json({ msg: error });
  }
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

exports.updateById = async (req, res) => {
  try {
    const Op = Sequelize.Op;
    let assignEvaluators = [];
    const { id } = req.params;
    let {
      name,
      areaId,
      userId,
      author,
      members,
      status,
      evaluatorId1,
      evaluatorId2,
      addEvaluators,
      newVersion,
      correctionNumber,
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
        userId: userId,
        author: author,
        status,
        evaluatorId1: evaluatorId1,
        evaluatorId2: evaluatorId2,
        correctionNumber: correctionNumber + 1,
      },
      { where: { id: id } }
    );
    let options = {
      where: {},
      attributes: ["name", "surname", "email"],
    };

    if (doc) {
      if (assignEvaluators.length > 0) {
        options.where = {
          [Op.or]: assignEvaluators,
        };

        // user = evaluadores asignados al trabajo
        const user = await UserModel.findAll(options);
        const admins = await UserModel.findAll({
          where: { roleId: 1 },
          attributes: ["name", "surname", "email"],
        });

        if (addEvaluators) {
          user.forEach((evaluator) => {
            let mailOptions = {
              from: process.env.EMAIL_APP,
              to: evaluator.email,
              subject: "Nuevo trabajo asignado",
              template: "mailAssignToJob",
              attachments: [
                {
                  filename: "appLogo.jpg",
                  path: "./public/logos/appLogo.jpg",
                  cid: "logo", //my mistake was putting "cid:logo@cid" here!
                },
              ],
              context: {
                evaluatorName: evaluator.name + " " + evaluator.surname,
                jobName: name,
              },
            };
            transporter.sendMail(mailOptions, (error, info) => {
              if (error) {
                console.log(error);
                return res
                  .status(500)
                  .json({ msg: "Error al enviar el email al evaluador/es" });
              } else {
                console.log("Email enviado!");
                res.end();
              }
            });

            //send email with your configuration
            return res.status(200).json({ msg: "Evaluador asignado!" });
          });
        }
      }
      res.status(200).json({ msg: "Trabajo editado!" });
    } else {
      res.status(500).json({ msg: "Error al editar el trabajo" });
    }
  } catch (error) {
    console.log("El Trabajo no existe!" + error);
  }
};

exports.uploadFileJob = async (req, res) => {
  try {
    uploadJob(req, res, async (err) => {
      if (err) {
        return res.status(400).json({ msg: err.message });
      }

      const { id } = req.body;
      console.log({ body: req.body })

      const doc = await JobModel.findOne({
        where: { id: id },
      });

      // Buscamos cual fue la ultima version del trabajo

      let { versionNumber } = await JobVersionModel.findOne({
        where: { jobId: id },
        order: [["versionNumber", "DESC"]],
      });

      const newVersion = await JobVersionModel.create({
        jobId: id,
        versionNumber: versionNumber + 1,
        urlFile: jobUUID,
      });

      let assignEvaluators = [];

      if (doc.evaluatorId1 === "") {
        doc.evaluatorId1 = null;
      } else {
        assignEvaluators.push({ id: Number(doc.evaluatorId1) });
      }

      if (doc.evaluatorId2 === "") {
        doc.evaluatorId2 = null;
      } else {
        assignEvaluators.push({ id: Number(doc.evaluatorId2) });
      }

      let options = {
        where: {
          [Sequelize.Op.or]: assignEvaluators,
        },
        attributes: ["name", "surname", "email"],
      };

      const evaluators = await UserModel.findAll(options);
      const admins = await UserModel.findAll({
        where: { roleId: 1 },
        attributes: ["name", "surname", "email"],
      });

      admins.forEach((admin) => {
        let mailOptions = {
          from: process.env.EMAIL_APP,
          to: admin.email,
          subject: "Nueva versión del trabajo",
          template: "mailWithNewVersionJobAdmin",
          attachments: [
            {
              filename: "appLogo.jpg",
              path: "./public/logos/appLogo.jpg",
              cid: "logo", //my mistake was putting "cid:logo@cid" here!
            },
          ],
          context: {
            adminName: admin.name + " " + admin.surname,
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
      evaluators.forEach((evaluator) => {
        let mailOptions = {
          from: process.env.EMAIL_APP,
          to: evaluator.email,
          subject: "Nueva versión del trabajo",
          template: "mailWithNewVersionJob",
          attachments: [
            {
              filename: "appLogo.jpg",
              path: "./public/logos/appLogo.jpg",
              cid: "logo",
            },
          ],
          context: {
            evaluatorName: evaluator.name + " " + evaluator.surname,
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

      if (doc) {
        return res.status(200).json({ msg: "Archivo actualizado!" });
      } else {
        return res.status(500).json({ msg: "Error al subir el archivo." });
      }
    });
  } catch (error) {
    return res.status(400).json({ msg: error });
  }
};

exports.validateOwnJob = async (req, res) => {
  try {
    const { jobId, userId } = req.params;
    const isOwnJob = await JobModel.findOne({
      where: {
        id: jobId,
        userId: userId,
      },
    });

    const isJobFound = isOwnJob !== null;

    res.status(200).json({ response: isJobFound });
  } catch (error) {
    console.log("Error al obtener el Trabajo." + error);
  }
};

exports.getById = async (req, res) => {
  try {
    const { id } = req.params;
    const doc = await JobModel.findAll({
      where: { id },
      include: [
        { model: AreaModel },
        { model: JobModalityModel },
        { model: UserModel, as: "user" },
        { model: UserModel, as: "evaluator1" },
        { model: UserModel, as: "evaluator2" },
      ],
    });

    if (doc) {
      res.status(200).json({ response: doc });
    } else {
      res.status(500).json({ msg: "Error al obtener el Trabajo." });
    }
  } catch (error) {
    console.log("Error al obtener el Trabajo." + error);
  }
};

exports.getAll = async (req, res) => {
  try {
    const doc = await JobModel.findAll({
      include: [
        { model: UserModel, as: "user" },
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
  } catch (error) {
    console.log("Error al obtener los Trabajos.");
  }
};
exports.getAmountJobs = async (req, res) => {
  try {
    const summaries = [],
      completeWorks = [];

    const allAreas = await AreaModel.findAll();
    const doc = await JobModel.findAll();

    allAreas.forEach((area) => {
      const areaAndCompleteWorks = doc.filter(
        (job) => job.areaId === area.id && job.jobModalityId === 1
      );
      const areaAndSummaries = doc.filter(
        (job) => job.areaId === area.id && job.jobModalityId === 2
      );
      completeWorks.push({
        id: area.id,
        areaName: area.name,
        amount: areaAndCompleteWorks.length,
      });
      summaries.push({
        id: area.id,
        areaName: area.name,
        amount: areaAndSummaries.length,
      });
    });

    if (doc && allAreas) {
      res.status(200).json({ response: { completeWorks, summaries } });
    } else {
      res.status(500).json({ msg: "Error al obtener los Trabajos." });
    }
  } catch (error) {
    console.log("Error al obtener los Trabajos.");
  }
};

exports.deleteById = async (req, res) => {
  try {
    const { id } = req.params;

    const corrections = await JobDetailModel.destroy({
      where: { jobId: id },
    });

    const versions = await JobVersionModel.destroy({
      where: { jobId: id },
    });

    const doc = await JobModel.destroy({
      where: { id: id },
    });

    if (doc) {
      res.status(200).send("Trabajo eliminado!");
    } else {
      res.status(500).json({ msg: "Error al eliminar el trabajo." });
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ msg: "Error al eliminar el trabajo." });
  }
};

exports.getAllPaginated = async (req, res) => {
  try {
    const {
      userId,
      author,
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
          as: "user",
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
    if (author) {
      options.where.author = {
        [Op.like]: `%${author}%`,
      };
    }

    if (jobModalityId) {
      options.where.jobModalityId = jobModalityId;
    }
    if (userId) {
      options.where.userId = userId;
    }
    
    const optionsLookup = {
      3: { evaluatorId1: null, evaluatorId2: null },
      1: { approve: 0, status: 1 },
      2: { approve: 1, status: null },
      0: { status: { [Op.or]: [{ [Op.ne]: 1 }, { [Op.is]: null }] } },
    };
    
    if (status) {
      const option = optionsLookup[Number(status)];
      if (option) {
        Object.assign(options.where, option);
      }
    }

    if (evaluatorId) {
      options.where = {
        [Op.or]: [{ evaluatorId1: evaluatorId }, { evaluatorId2: evaluatorId }],
      };
    }
    if (areaId) {
      options.where.areaId = areaId;
    }

    console.log(options);
    const { count, rows } = await JobModel.findAndCountAll(options);
    const cantPages = calcTotalPages(count);

    if (rows) {
      res.status(200).json({ pages: cantPages, response: rows });
    } else {
      res.status(500).json({ msg: "La instancia no existe." });
    }
  } catch (error) {
    console.log("La instancia no existe." + error);
  }
};
exports.getAllJobsByUser = async (req, res) => {
  try {
    const { userId } = req.query;
    console.log(req.query);
    let options = {
      where: {},
      include: [
        { model: AreaModel },
        { model: JobModalityModel },
        { model: UserModel, as: "user", attributes: ["name", "surname"] },
        { model: CorrectionModel, as: "jobStatus" },
        { model: UserModel, as: "evaluator1", attributes: ["name", "surname"] },
        { model: UserModel, as: "evaluator2", attributes: ["name", "surname"] },
      ],
    };

    if (userId) {
      options.where.userId = Number(userId);
    }

    const jobsByUser = await JobModel.findAll(options);

    if (jobsByUser) {
      res.status(200).json({ response: jobsByUser });
    } else {
      res.status(500).json({ msg: "Los trabajos del usuario no existen." });
    }
  } catch (error) {
    console.log(error);
  }
};

exports.getByAuthorId = async (req, res) => {
  try {
    const { userId } = req.params;
    const job = await JobModel.findOne({
      where: { userId },
    });

    if (job) {
      res.status(200).json({ response: [job] });
    } else {
      res.status(200).json({ response: [] });
    }
  } catch (error) {
    console.log("Error al obtener el trabajo del autor." + error);
  }
};

exports.getAllJobsByUser = async (req, res) => {
  try {
    const { userId } = req.query;
    console.log(req.query);
    let options = {
      where: {},
      include: [
        { model: AreaModel },
        { model: JobModalityModel },
        {
          model: UserModel,
          as: "user",
          attributes: ["name", "surname"],
        },
        { model: CorrectionModel, as: "jobStatus" },
        { model: UserModel, as: "evaluator1", attributes: ["name", "surname"] },
        { model: UserModel, as: "evaluator2", attributes: ["name", "surname"] },
      ],
    };

    if (userId) {
      options.where.userId = userId;
    }

    const jobsByUser = await JobModel.findAll(options);

    if (jobsByUser) {
      res.status(200).json({ response: jobsByUser });
    } else {
      res.status(500).json({ msg: "Los trabajos del usuario no existen." });
    }
  } catch (error) {
    console.log(error);
  }
};

exports.setStatusJob = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const doc = await JobModel.update(
      {
        status: Number(status),
      },
      { where: { id: id } }
    );
    if (doc) {
      res.status(200).json({ msg: "Trabajo corregido!" });
    } else {
      res.status(500).json({ msg: "El Trabajo no existe!" });
    }
  } catch (error) {
    console.log("El Trabajo no existe!" + error);
  }
};

const optionsToFilter = (req) => {
  try {
    const Op = Sequelize.Op;
    const {
      author,
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
          as: "user",
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
    if (author) {
      options.where.author = {
        [Op.like]: `%${author}%`,
      };
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
  try {
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
      job.author = job.author;
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
  } catch (error) {
    console.log("Error al descargar" + error);
  }
};
