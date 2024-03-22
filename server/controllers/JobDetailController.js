const AreaModel = require("../models/AreaModel");
const JobDetailModel = require("../models/JobDetailModel");
const { PAGE_LIMIT } = process.env;
const UserModel = require("../models/UserModel");
const { transporter } = require("../utils/utils");
const CorrectionModel = require("../models/CorrectionModel");
const JobModel = require("../models/JobModel");
const hbs = require("nodemailer-express-handlebars");
const path = require("path");
const JobVersionModel = require("../models/JobVersionModel");

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
  //approve = 1 -> Significa que el admin tiene evaluaciones de ese trabajo para crear una evaluacion definitiva
  //approve = 0 -> Significa que el admin NO tiene evaluaciones de ese trabajo
  //sendMail = 1 -> Significa que se envia un email
  try {
    const {
      jobId,
      evaluatorId,
      correctionId,
      details,
      sendMail,
      correctionNumber,
    } = req.body;
    let mailOptions;

    console.log(req.body);

    const detail = await JobDetailModel.create({
      jobId,
      evaluatorId,
      correctionId,
      details,
      correctionNumber,
      sendMail,
    });

    //approve in 1 to admin approve
    await JobModel.update({ approve: 1 }, { where: { id: jobId } });

    if (detail) {
      const doc = await JobModel.findOne({
        where: { id: jobId },
        include: [
          {
            model: UserModel,
            as: "user",
            attributes: ["name", "surname", "email"],
          },
        ],
      });

      const { name, user } = doc;
      const correction = await CorrectionModel.findOne({
        where: { id: correctionId },
      });

      const admins = await UserModel.findAll({
        where: { roleId: 1 },
      });

      const getCorrectionStatus = () =>
        correctionId === 1
          ? "Trabajo aceptado"
          : correctionId === 4
            ? "Trabajo no Aceptado"
            : "Nueva corrección";

      // sendMail = 1 => send email to author's job
      if (Number(sendMail) === 1) {
        const latestJobVersion = await JobVersionModel.findOne({
          where: { jobId: jobId },
          order: [['versionNumber', 'DESC']]
        });

        console.log({
          latestJobVersion
        })
        
        if (latestJobVersion) {
          await JobVersionModel.update(
            { 
              status: correction.name,
              feedback: details,
              correctionDate: detail.date,
            },
            { where: { id: latestJobVersion.id } }
          );
        }

        mailOptions = {
          from: process.env.EMAIL_APP,
          to: user.email,
          subject: getCorrectionStatus(),
          template: "mailNewCorrection",
          attachments: [
            {
              filename: "appLogo.jpg",
              path: "./public/logos/appLogo.jpg",
              cid: "logo",
            },
          ],
          context: {
            evaluatorName: user.name + " " + user.surname,
            titleTp: name,
            correctionStatus: getCorrectionStatus(),
            correctionName: correction.name,
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

        //approve in 0 because correction is approved
        await JobModel.update(
          {
            status: correctionId,
            approve: 0,
          },
          { where: { id: jobId } }
        );
      } else {
        admins.forEach((admin, i) => {
          var mailOptions = {
            from: process.env.EMAIL_APP,
            to: admin.email,
            subject: "Nueva evaluación",
            template: "mailWithNewEvaluationJob",
            attachments: [
              {
                filename: "appLogo.jpg",
                path: "./public/logos/appLogo.jpg",
                cid: "logo",
              },
            ],
            context: {
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
          return res.status(200).json({ msg: "Correción creada!" });
        });
      }

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
    const { jobId, correctionNumber, roleId } = req.params;

    let options = "";
    //evaluatorId: 1 -> el 1 indica que esa correccion la creo el admin

    let whereOpts = {
      jobId,
      correctionNumber,
    };

    options = {
      where: whereOpts,
      include: [
        { model: CorrectionModel },
        {
          model: UserModel,
          as: "evaluator",
          attributes: ["name", "surname"],
        },
        {
          model: JobModel,
          attributes: ["name"],
        },
      ],
    };

    let detail = await JobDetailModel.findAll(options);

    if (Number(roleId) !== 1) {
      const searchAdmins = await UserModel.findAll({
        where: { roleId: 1 },
        attributes: ["id"],
      });

      const adminsIds = searchAdmins.map((admin) => admin.id);
      detail = detail.filter((c) => adminsIds.includes(c.evaluatorId));
    }

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
    const { jobId, evaluatorId, correctionNumber } = req.params;
    const detail = await JobDetailModel.findOne({
      where: { jobId, evaluatorId, correctionNumber },
    });

    if (detail) {
      res.status(200).json({ response: detail, value: 1 });
    } else {
      res.status(200).json({ msg: "No posee correcciones.", value: 0 });
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
