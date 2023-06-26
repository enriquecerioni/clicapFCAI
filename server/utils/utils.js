const nodemailer = require("nodemailer");
const path = require("path");
const fs = require("fs");

exports.transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_APP,
    pass: process.env.PASSWORD_EMAIL_APP,
  },
});

exports.deleteFileGeneric = (objToDelete) => {
  try {
    const { nameFile, folder } = objToDelete;
    const ruta = path.join(__dirname, `../public/${folder}/${nameFile}`);
    console.log(ruta);
    fs.unlinkSync(ruta);
    console.log("Archivo eliminado correctamente.");
  } catch (error) {
    console.log(error);
  }
};
