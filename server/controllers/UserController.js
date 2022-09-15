const UserModel = require("../models/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const path = require("path");
//NODEMAILER
const nodemailer = require("nodemailer");
const hbs = require("nodemailer-express-handlebars");
const { response } = require("express");
const RoleModel = require("../models/RoleModel");

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
          filename: "clicap.png",
          path: "./assets/clicap.png",
          cid: "logo", //my mistake was putting "cid:logo@cid" here!
        },
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
      let encryptedPassword = bcrypt.hashSync(password, 10);

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
              filename: "clicap.png",
              path: "./assets/clicap.png",
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
};
exports.login = async (req, res) => {
  const { identifyNumber, password } = req.body;

  // Validate user input
  if (!(identifyNumber && password)) {
    return res
      .status(400)
      .json({ msg: "La identificación numérica y constraseña son requeridos" });
  }
  // Validate if user exist in our database
  const user = await UserModel.findOne({
    where: { identifyNumber: identifyNumber },
  });

  if (user && (await bcrypt.compare(password, user.password))) {
    delete user.password;
    return res.status(200).json({ msg: "Usuario logado!", user: user });
  } else {
    return res.status(401).json({ msg: "Id o contraseña incorrecta" });
  }
};

exports.updateById = async (req, res) => {
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
  const userDB = await UserModel.findByPk(id);
  if (
    userDB.identifyNumber != identifyNumber ||
    !(await bcrypt.compare(password, userDB.password)) ||
    userDB.email != email
  ) {
    var mailOptions = {
      from: process.env.EMAIL_APP,
      to: email,
      subject: "Usuario editado - credenciales",
      template: "mailCredentials",
      attachments: [
        {
          filename: "clicap.png",
          path: "./assets/clicap.png",
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
  }
  //encripta la contraseña
  let encryptedPassword = bcrypt.hashSync(password, 10);

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
    return res.status(200).json({ response: "Usuario editado correctamente!" });
  } else {
    res.status(500).json({ msg: "El usuario no existe!" });
  }
};
exports.getById = async (req, res) => {
  const { id } = req.params;
  const user = await UserModel.findByPk(id);

  if (user) {
    res.status(200).json({ response: user });
  } else {
    res.status(500).json({ msg: "Error al obtener el usuario." });
  }
};
exports.getAll = async (req, res) => {
  const user = await UserModel.findAll({
    include: [{ model: RoleModel }],
  });
  if (user) {
    res.status(200).json({ response: user });
  } else {
    res.status(500).json({ msg: "Error al obtener los usuarios." });
  }
};
exports.getAllEvaluators = async (req, res) => {
  let evaluatorsFormat = [];
  const evaluators = await UserModel.findAll({
    where: { roleId: 2 },
    attributes: ["id", "name", "surname"],
  });

  evaluators.map((item, i) => {
    evaluatorsFormat.push({
      value: item.id,
      label: item.name + " " + item.surname,
    });
  });
  
  if (evaluators) {
    res.status(200).json({ response: evaluatorsFormat });
  } else {
    res.status(500).json({ msg: "Error al obtener los evaluadores." });
  }
};
exports.deleteById = async (req, res) => {
  const { id } = req.params;
  const user = await UserModel.destroy({
    where: { id: id },
  });

  if (user) {
    res.status(200).send("Usuario eliminado correctamente!");
  } else {
    res.status(500).json({ msg: "Error al eliminar el usuario." });
  }
};
