const AreaModel = require("../models/AreaModel");
const JobDetailModel = require("../models/JobDetailModel");
const { PAGE_LIMIT } = process.env;
const UserModel = require("../models/UserModel");
const Sequelize = require("sequelize");
const JobModalityModel = require("../models/JobModalityModel");
const CorrectionModel = require("../models/CorrectionModel");
const JobModel = require("../models/JobModel");
//NODEMAILER
const nodemailer = require("nodemailer");
const hbs = require("nodemailer-express-handlebars");
const path = require("path");

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

exports.create = async (req, res) => {
  const { jobId, evaluatorId, correctionId, details, sendMail } = req.body;
  console.log(req.body);
  const detail = await JobDetailModel.create({
    jobId,
    evaluatorId,
    correctionId,
    details,
    sendMail,
  });
  if (Number(sendMail) === 1) {
    const doc = await JobModel.findOne({
      where: { id: jobId },
      include: [{ model: UserModel, as: "author", attributes: ["email"] }],
    });
    await JobModel.update({ status: correctionId }, { where: { id: jobId } });
    
    var mailOptions = {
      from: process.env.EMAIL_APP,
      to: doc.author.email,
      subject: "Nueva corrección",
      template: "mailNewCorrection",
      attachments: [
        {
          filename: "clicap.png",
          path: "./assets/clicap.png",
          cid: "logo", //my mistake was putting "cid:logo@cid" here!
        },
      ],
      context: {
        titleTp: doc.name,
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
    return res.status(200).json({ msg: "Correción creada!" });
  }
  if (detail) {
    res.status(200).json({ msg: "Correción creada!" });
  } else {
    res.status(500).json({ msg: "Error al crear la corrección." });
  }
};
exports.updateById = async (req, res) => {
  const { id } = req.params;
  const { jobId, evaluatorId, correctionId, details, sendMail, date } =
    req.body;

  const detail = await JobDetailModel.update(
    {
      jobId,
      evaluatorId,
      sendMail,
      correctionId,
      details,
      date,
    },
    { where: { id: id } }
  );
  if (detail) {
    res.status(200).json("Corrección editada!");
  } else {
    res.status(500).json({ msg: "La corrección no existe!" });
  }
};
exports.getById = async (req, res) => {
  const { jobId } = req.params;
  const detail = await JobDetailModel.findAll({
    where: { jobId },
    include: [
      { model: CorrectionModel },
      { model: UserModel, as: "evaluator", attributes: ["name", "surname"] },
      {
        model: JobModel,
        attributes: ["name", "urlFile"],
      },
    ],
  });

  if (detail) {
    res.status(200).json({ response: detail });
  } else {
    res.status(500).json({ msg: "Error al obtener la corrección." });
  }
};
exports.getAll = async (req, res) => {
  const details = await JobDetailModel.findAll();
  if (details) {
    res.status(200).json({ response: details });
  } else {
    res.status(500).json({ msg: "Error al obtener los Trabajos." });
  }
};
exports.deleteById = async (req, res) => {
  const { id } = req.params;
  const detail = await JobDetailModel.destroy({
    where: { id: id },
  });

  if (detail) {
    res.status(200).send("Corrección eliminada!");
  } else {
    res.status(500).json({ msg: "Error al eliminar la correción." });
  }
};
/* 
exports.getAllPaginated = async (req, res) => {
  const { authorId, name, surname, areaId } = req.query;
  console.log(req.query);
  const { page } = req.params;

  const Op = Sequelize.Op;
  const offsetIns = calcNumOffset(page);
  let options = {
    where: {},
    include: [{ model: AreaModel }, { model: JobModalityModel }],
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
  if (areaId) {
    options.where.areaId = areaId;
  }

  const { count, rows } = await JobDetailModel.findAndCountAll(options);
  const cantPages = calcTotalPages(count);

  if (rows) {
    res.status(200).json({ pages: cantPages, response: rows });
  } else {
    res.status(500).json({ msg: "La instancia no existe." });
  }
}; */
