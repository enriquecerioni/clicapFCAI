const CertificateModel = require("../models/CertificateModel");
const path = require("path");
const fs = require("fs");

// function to encode file data to base64 encoded string
function base64_encode(file) {
  // read binary data
  var bitmap = fs.readFileSync(file);
  // convert binary data to base64 encoded string
  return new Buffer(bitmap).toString("base64");
}
exports.create = async (req, res) => {
  const { type, name, jobtext, text, introtext } = req.body;
  const certificate = await CertificateModel.create({
    type,
    name,
    jobtext,
    text,
    introtext,
  });
  if (certificate) {
    res.status(200).json({ msg: "Nuevo certificado creado!" });
  } else {
    res.status(500).json({ msg: "Error al crear el certificado" });
  }
};
exports.updateById = async (req, res) => {
  const { id } = req.params;
  const { type, name, jobtext, text, introtext } = req.body;

  const certificate = await CertificateModel.update(
    {
      type,
      name,
      jobtext,
      text,
      introtext,
    },
    { where: { id: id } }
  );
  if (certificate) {
    res.status(200).json("Certificado editado correctamente!");
  } else {
    res.status(500).json({ msg: "El certificado no existe!" });
  }
};
exports.getById = async (req, res) => {
  const { id } = req.params;
  const certificate = await CertificateModel.findByPk(id);

  if (certificate) {
    res.status(200).json({ response: certificate });
  } else {
    res.status(500).json({ msg: "Error al obtener el certificado." });
  }
};
exports.getAll = async (req, res) => {
  const certificate = await CertificateModel.findAll();
  if (certificate) {
    res.status(200).json({ response: certificate });
  } else {
    res.status(500).json({ msg: "Error al obtener los certificados." });
  }
};
exports.getCertificateLogo = async (req, res) => {
  const imgbase64 = base64_encode(
    path.join(__dirname, "../assets/certificateLogo.jpg")
  );
  if (imgbase64 !== null || imgbase64 !== undefined) {
    res.status(200).json({ response: imgbase64 });
  } else {
    res.status(500).json({ msg: "Error al obtener el logo del certificado." });
  }
};

exports.deleteById = async (req, res) => {
  const { id } = req.params;
  const certificate = await CertificateModel.destroy({
    where: { id: id },
  });

  if (certificate) {
    res.status(200).send("Certificado eliminado correctamente!");
  } else {
    res.status(500).json({ msg: "Error al eliminar el certificado." });
  }
};
