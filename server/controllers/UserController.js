const UserModel = require("../models/UserModel");
const JobModel = require("../models/JobModel");
const JobDetailModel = require("../models/JobDetailModel");
const StudentCertificateModel = require("../models/StudentCertificateModel");
const PayModel = require("../models/PayModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const path = require("path");
const Sequelize = require("sequelize");
const excelJS = require("exceljs");
const { PAGE_LIMIT } = process.env;
const EXCEL_CELL_WIDTH = 12;
//NODEMAILER
const nodemailer = require("nodemailer");
const hbs = require("nodemailer-express-handlebars");
const { response } = require("express");
const RoleModel = require("../models/RoleModel");
const { calcNumOffset, calcTotalPages } = require("../helpers/helpers");

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

exports.register = async (req, res) => {
  const {
    name,
    surname,
    email,
    roleId,
    identifyType,
    identifyNumber,
    address,
    institution,
    phone,
    password,
    passwordConfirm,
  } = req.body;
  console.log(req.body);
  try {
    //inputs validate
    if (
      !(
        name &&
        surname &&
        email &&
        roleId &&
        identifyType &&
        identifyNumber &&
        address &&
        institution &&
        phone &&
        password
      )
    ) {
      return res.status(400).json({ msg: "Todos los campos son requeridos." });
    }
    //password validate
    if (password !== passwordConfirm) {
      return res.json({
        msg: "Las contraseñas ingresadas no son iguales.",
      });
    }

    const token = jwt.sign(
      {
        name,
        surname,
        email,
        roleId,
        identifyType,
        identifyNumber,
        address,
        institution,
        phone,
        password,
      },
      process.env.JWT_ACOUNT_ACTIVE,
      { expiresIn: "20m" }
    );

    var mailOptions = {
      from: process.env.EMAIL_APP,
      to: email,
      subject: "Active su cuenta",
      template: "mailRegister",
      attachments: [
        {
          filename: "appLogo.jpg",
          path: "./public/logos/appLogo.jpg",
          cid: "logo", //my mistake was putting "cid:logo@cid" here!
        },
        /*         {
          filename: 'certif.pdf',
          path: './assets/certif.pdf',
          contentType: 'application/pdf'
        } */
      ],
      context: {
        url: process.env.CLIENT_LOCALHOST + "/acount-activate/" + token,
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

    return res.status(200).json({
      response: "Enviando email para que active su cuenta...",
    });
  } catch (error) {
    return res.status(500).send({
      msg: "Error al registrar el usuario. " + error,
    });
  }
};
exports.acountActivate = async (req, res) => {
  try {
    const token = req.params.token;
    if (token) {
      //verifica el token
      jwt.verify(token, process.env.JWT_ACOUNT_ACTIVE, async (err, decoded) => {
        if (err) {
          return res
            .status(401)
            .json({ msg: "Token incorrecto o el tiempo expiró." });
        }
        console.log("se verifico correctamente el token");
        const {
          name,
          surname,
          email,
          roleId,
          identifyType,
          identifyNumber,
          address,
          institution,
          phone,
          password,
        } = decoded;

        //encripta la contraseña
        /* let encryptedPassword = bcrypt.hashSync(password, 10); */
        let encryptedPassword = jwt.sign(
          { password },
          process.env.JWT_ACOUNT_ACTIVE
        );

        //verifica que el usuario no exista
        const oldUser = await UserModel.findOne({
          where: { identifyNumber: identifyNumber },
        });

        if (oldUser) {
          return res.status(409).json({ msg: "El usuario ya existe." });
        }
        //registra al usuario en la base de datos
        const user = await UserModel.create({
          name: name,
          surname: surname,
          password: encryptedPassword,
          email: email,
          address: address,
          roleId: roleId,
          identifyType: identifyType,
          identifyNumber: identifyNumber,
          institution: institution,
          phone: phone,
        });
        if (user) {
          var mailOptions = {
            from: process.env.EMAIL_APP,
            to: email,
            subject: "Cuenta activada - credenciales",
            template: "mailCredentials",
            attachments: [
              {
                ffilename: "appLogo.jpg",
                path: "./public/logos/appLogo.jpg",
                cid: "logo",
              },
            ],
            context: { id: identifyNumber, password: password },
          };

          transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
              return res.status(500).json({ msg: error.message });
            } else {
              console.log("Email enviado!");
              res.end();
            }
          });
          return res.status(200).json({ response: "Usuario registrado!" });
        } else {
          return res.status(500).json({ msg: "Error al registrar el usuario" });
        }
      });
    }
  } catch (error) {
    console.log("Error al registrar el usuario");
  }
};

exports.login = async (req, res) => {
  try {
    const { identifyNumber, password } = req.body;
    // Validate user input
    if (!(identifyNumber && password)) {
      return res.status(400).json({
        msg: "La identificación numérica y constraseña son requeridos",
      });
    }
    // Validate if user exist in our database
    const user = await UserModel.findOne({
      where: { identifyNumber: identifyNumber },
    });

    if (user) {
      jwt.verify(
        user.password,
        process.env.JWT_ACOUNT_ACTIVE,
        async (err, decoded) => {
          if (err) {
            return res
              .status(401)
              .json({ msg: "Token incorrecto o el tiempo expiró." });
          }
          const passwordToken = decoded.password;

          if (user && password === passwordToken) {
            delete user.password;
            return res.status(200).json({ msg: "Usuario logado!", user: user });
          } else {
            return res.status(401).json({ msg: "Id o contraseña incorrecta" });
          }
        }
      );
    } else {
      return res
        .status(400)
        .json({ msg: "No existe ningún usuario con ese ID." });
    }
  } catch (error) {
    console.log("No existe ningún usuario con ese ID." + error);
  }
};

exports.updateById = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      surname,
      email,
      roleId,
      identifyType,
      identifyNumber,
      address,
      institution,
      phone,
      password,
    } = req.body;

    //encripta la contraseña
    let encryptedPassword = jwt.sign(
      { password },
      process.env.JWT_ACOUNT_ACTIVE
    );
    const user = await UserModel.update(
      {
        name: name,
        surname: surname,
        email: email,
        roleId: roleId,
        identifyType: identifyType,
        identifyNumber: identifyNumber,
        address: address,
        institution: institution,
        phone: phone,
        password: encryptedPassword,
      },
      { where: { id: id } }
    );

    if (user) {
      var mailOptions = {
        from: process.env.EMAIL_APP,
        to: email,
        subject: "Usuario editado - credenciales",
        template: "mailCredentials",
        attachments: [
          {
            filename: "appLogo.jpg",
            path: "./public/logos/appLogo.jpg",
            cid: "logo",
          },
        ],
        context: { id: identifyNumber, password: password },
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          return res.status(500).json({ msg: error.message });
        } else {
          console.log("Email enviado!");
          res.end();
        }
      });
      return res
        .status(200)
        .json({ response: "Usuario editado correctamente!" });
    } else {
      res.status(500).json({ msg: "El usuario no existe!" });
    }
  } catch (error) {
    console.log("El usuario no existe!" + error);
  }
};

exports.getById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await UserModel.findByPk(id);
    if (user) {
      jwt.verify(
        user.password,
        process.env.JWT_ACOUNT_ACTIVE,
        async (err, decoded) => {
          if (err) {
            return res
              .status(401)
              .json({ msg: "Token incorrecto o el tiempo expiró." });
          }
          user.password = decoded.password;
          if (user) {
            res.status(200).json({ response: user });
          } else {
            res.status(500).json({ msg: "Error al obtener el usuario." });
          }
        }
      );
    } else {
      res.status(400).json({ msg: "No existe el usuario." });
    }
  } catch (error) {
    console.log("No existe el usuario.");
  }
};

exports.getAll = async (req, res) => {
  try {
    const user = await UserModel.findAll({
      include: [{ model: RoleModel }],
    });
    if (user) {
      res.status(200).json({ response: user });
    } else {
      res.status(500).json({ msg: "Error al obtener los usuarios." });
    }
  } catch (error) {
    console.log("Error al obtener los usuarios.");
  }
};

exports.getAllEvaluators = async (req, res) => {
  try {
    const evaluators = await UserModel.findAll({
      where: { roleId: 2 },
      attributes: ["id", "name", "surname"],
    });

    if (evaluators) {
      res.status(200).json({ response: evaluators });
    } else {
      res.status(500).json({ msg: "Error al obtener los evaluadores." });
    }
  } catch (error) {
    console.log("Error al obtener los evaluadores.");
  }
};

exports.deleteById = async (req, res) => {
  try {
    const { id } = req.params;

    //search jobs by userId
    const jobs = await JobModel.findAll({
      where: { authorId: id },
    });

    if (jobs && jobs.length > 0) {
      //delete job details by jobId
      jobs.forEach(async (job) => {
        await JobDetailModel.destroy({
          where: { jobId: job.id },
        });
      });
      //delete jobs
      await JobModel.destroy({
        where: { authorId: id },
      });
    }

    //delete studentCertificates
    await StudentCertificateModel.destroy({
      where: { userId: id },
    });

    //delete Pays
    await PayModel.destroy({
      where: { authorId: id },
    });

    const user = await UserModel.destroy({
      where: { id: id },
    });

    if (user) {
      res.status(200).json({ msg: "Usuario eliminado correctamente!" });
    } else {
      res.status(500).json({ msg: "Error al eliminar el usuario." });
    }
  } catch (error) {
    console.log("Error al eliminar el usuario." + error);
  }
};

exports.getAllPaginated = async (req, res) => {
  try {
    const { name, identifyNumber, roleId } = req.query;
    console.log(req.query);
    const { page } = req.params;
    const Op = Sequelize.Op;
    const offsetIns = calcNumOffset(page);
    let options = {
      where: {},
      include: [{ model: RoleModel }],
      offset: offsetIns,
      limit: Number(PAGE_LIMIT),
    };

    if (name) {
      options.where.name = {
        [Op.like]: `%${name}%`,
      };
    }

    if (identifyNumber) {
      options.where.identifyNumber = identifyNumber;
    }
    if (roleId) {
      options.where.roleId = roleId;
    }

    const { count, rows } = await UserModel.findAndCountAll(options);
    const cantPages = calcTotalPages(count);

    if (rows) {
      res.status(200).json({ pages: cantPages, response: rows });
    } else {
      res.status(500).json({ msg: "Los usuarios no existen." });
    }
  } catch (error) {
    console.log("Los usuarios no existen." + error);
  }
};

//Export in excel
const optionsToFilter = (req) => {
  try {
    const { name, identifyNumber, roleId } = req.query;
    const Op = Sequelize.Op;
    let options = {
      where: {},
      include: [{ model: RoleModel }],
    };

    if (name) {
      options.where.name = {
        [Op.like]: `%${name}%`,
      };
    }

    if (identifyNumber) {
      options.where.identifyNumber = identifyNumber;
    }
    if (roleId) {
      options.where.roleId = roleId;
    }
    return options;
  } catch (e) {
    console.log(e);
    return res.status(503).json({ msg: "Fallo en el servidor" });
  }
};
exports.downloadFilter = async (req, res) => {
  const options = optionsToFilter(req);
  const rows = await UserModel.findAll(options);
  const workbook = new excelJS.Workbook(); // Create a new workbook
  const worksheet = workbook.addWorksheet("Mi reporte"); // New Worksheet
  // Column for data in excel. key must match data key
  worksheet.columns = [
    { header: "Nombre", key: "name", width: EXCEL_CELL_WIDTH },
    { header: "Dni", key: "identifyNumber", width: EXCEL_CELL_WIDTH },
    { header: "Email", key: "email", width: EXCEL_CELL_WIDTH },
    { header: "Rol", key: "roleId", width: EXCEL_CELL_WIDTH },
  ];
  // Looping through User data
  rows.forEach((user) => {
    user.roleId = user.role.name;
    worksheet.addRow(user); // Add data in worksheet
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
