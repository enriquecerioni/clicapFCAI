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
    pass: "ktsrrsbzpcjnyhgy",
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
  try {
    const { jobId, evaluatorId, correctionId, details, sendMail, approve } =
      req.body;
    console.log(req.body);
    const detail = await JobDetailModel.create({
      jobId,
      evaluatorId,
      correctionId,
      details,
      sendMail,
    });
    //approve in 1 to admin approve
    await JobModel.update({ approve: 1 }, { where: { id: jobId } });
    if (Number(sendMail) === 1) {
      const doc = await JobModel.findOne({
        where: { id: jobId },
        include: [
          {
            model: UserModel,
            as: "author",
            attributes: ["name", "surname", "email"],
          },
        ],
      });
      //approve in 0 because correction is approved
      await JobModel.update(
        { status: correctionId, approve: 0 },
        { where: { id: jobId } }
      );

      var mailOptions = {
        from: process.env.EMAIL_APP,
        to: doc.author.email,
        subject: "Nueva corrección",
        template: "mailNewCorrection",
        attachments: [
          {
            filename: "appLogo.jpg",
            path: "./public/logos/appLogo.jpg",
            cid: "logo", //my mistake was putting "cid:logo@cid" here!
          },
        ],
        context: {
          evaluatorName: doc.user.name + " " + doc.user.surname,
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
  } catch (error) {
    console.log("Error al crear la corrección." + error);
  }
};

exports.updateById = async (req, res) => {
  try {
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
  } catch (error) {
    console.log("La corrección no existe!" + error);
  }
};

exports.getById = async (req, res) => {
  try {
    const { jobId } = req.params;
    const { roleId, evaluatorId } = req.query;
    console.log(req.query);
    let options = "";
    if (Number(roleId) === 2) {
      options = {
        where: { jobId, evaluatorId: Number(evaluatorId) },
        include: [
          { model: CorrectionModel },
          {
            model: UserModel,
            as: "evaluator",
            attributes: ["name", "surname"],
          },
          {
            model: JobModel,
            attributes: ["name", "urlFile"],
          },
        ],
      };
    } else {
      options = {
        where: { jobId },
        include: [
          { model: CorrectionModel },
          {
            model: UserModel,
            as: "evaluator",
            attributes: ["name", "surname"],
          },
          {
            model: JobModel,
            attributes: ["name", "urlFile"],
          },
        ],
      };
    }

    const detail = await JobDetailModel.findAll(options);

    if (detail) {
      res.status(200).json({ response: detail });
    } else {
      res.status(500).json({ msg: "Error al obtener la corrección." });
    }
  } catch (error) {
    console.log("Error al obtener la corrección." + error);
  }
};

exports.checkCorrection = async (req, res) => {
  try {
    const { jobId, evaluatorId } = req.params;
    const detail = await JobDetailModel.findOne({
      where: { jobId, evaluatorId },
    });

    if (detail) {
      res.status(200).json({ response: detail, value: 1 });
    } else {
      res
        .status(200)
        .json({ msg: "Error al obtener la corrección.", value: 0 });
    }
  } catch (error) {
    console.log("Error al obtener la corrección." + error);
  }
};
exports.getAll = async (req, res) => {
  try {
    const details = await JobDetailModel.findAll();
    if (details) {
      res.status(200).json({ response: details });
    } else {
      res.status(500).json({ msg: "Error al obtener los Trabajos." });
    }
  } catch (error) {
    console.log("Error al obtener los Trabajos." + error);
  }
};
exports.deleteById = async (req, res) => {
  try {
    const { id } = req.params;
    const detail = await JobDetailModel.destroy({
      where: { id: id },
    });

    if (detail) {
      res.status(200).send("Corrección eliminada!");
    } else {
      res.status(500).json({ msg: "Error al eliminar la correción." });
    }
  } catch (error) {
    console.log("Error al eliminar la correción." + error);
  }
};
