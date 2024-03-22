const JobModel = require("../models/JobModel");
const JobVersionModel = require("../models/JobVersionModel");
const path = require("path");
const hbs = require("nodemailer-express-handlebars");
const { transporter } = require("../utils/utils");

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

exports.getByJobId = async (req, res) => {
  try {
    const { jobId } = req.params;

    let options = {
      where: { jobId: jobId },
      include: [
        {
          model: JobModel,
          attributes: ["name", "author", "status"],
        },
      ],
    };

    let jobVersions = await JobVersionModel.findAll(options);

    // if (Number(roleId) !== 1) {
    //   const searchAdmins = await UserModel.findAll({
    //     where: { roleId: 1 },
    //     attributes: ["id"],
    //   });

    //   const adminsIds = searchAdmins.map((admin) => admin.id);
    //   detail = detail.filter((c) => adminsIds.includes(c.evaluatorId));
    // }

    if (jobVersions) {
      res.status(200).json({ response: jobVersions });
    } else {
      res.status(500).json({ msg: "Error al obtener la corrección." });
    }
  } catch (error) {
    console.log("Error al obtener la corrección." + error);
  }
};
