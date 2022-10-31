const path = require("path");
const fs = require("fs");

exports.deleteFile = (req, res) => {
  try {
    const { nameFile, folder } = req.query;
    const ruta = path.join(__dirname, `../public/${folder}/${nameFile}`);
    console.log(ruta);
    fs.unlinkSync(ruta);
    console.log("Archivo eliminado correctamente.");
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};
