const UserModel = require("../models/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//NODEMAILER
const nodemailer = require("nodemailer");
const { response } = require("express");
var transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_APP,
    pass: "ifctzypbifginnzc",
  },
});
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
      html: `
        <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta http-equiv="X-UA-Compatible" content="IE=edge">
            </head>
            <body>
                <b>Por favor presione el boton "Activar cuenta" o ingrese a este link para activar su cuenta: </b>
                <br>
                <form method="get" action="${process.env.CLIENT_LOCALHOST}/acount-activate/${token}">
                    <button class="btn login_btn" type="submit">Activar cuenta
                </form>
                <br>
                <b>LINK:</b>
                <br>
                <a href="${process.env.CLIENT_LOCALHOST}/acount-activate/${token}">${process.env.CLIENT_LOCALHOST}/acount-activate/${token}</a>
            </body>
        </html>`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return res.status(500).json({msg:error.message});
      } else {
        console.log("Email enviado!");
        res.end();
      }
    });

    return res.status(200).json({
      response: "Se le ha enviado un email para que active su cuenta",
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
    jwt.verify(token, process.env.JWT_ACOUNT_ACTIVE, async(err, decoded) => {
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
          html: `
            <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta http-equiv="X-UA-Compatible" content="IE=edge">
                </head>
                <body>
                    <h1>Usted fue registrado en el sistema Clicap de manera exitosa!</h1>
                    <h1>Sus credenciales son: </h1>
                    <br>
                    <h2>ID: ${identifyNumber}</h2>
                    <h2>Constraseña: ${password}</h2>
                </body>
            </html>`,
        };
    
        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            return res.status(500).json({msg:error.message});
          } else {
            console.log("Email enviado!");
            res.end();
          }
        });
        return res.status(200).json({ response: "Usuario registrado!" });
      } else {
        return res.status(500).json({msg:"Error al registrar el usuario"});
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
      password: password,
    },
    { where: { id: id } }
  );
  if (user) {
    res.status(200).json({response:"Usuario editado correctamente!"});
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
  const user = await UserModel.findAll();
  if (user) {
    res.status(200).json({ response: user });
  } else {
    res.status(500).json({ msg: "Error al obtener los usuarios." });
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
