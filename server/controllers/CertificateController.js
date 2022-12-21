const CertificateModel = require("../models/CertificateModel");

exports.create = async (req, res) => {
  const { name, text } = req.body;
  const certificate = await CertificateModel.create({
    name: name,
    text: text,
  });
  if (certificate) {
    res.status(200).json({ msg: "Nuevo certificado creado!" });
  } else {
    res.status(500).json({ msg: "Error al crear el certificado" });
  }
};
exports.updateById = async (req, res) => {
  const { id } = req.params;
  const { name, text } = req.body;

  const certificate = await CertificateModel.update(
    {
      name,
      text,
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
