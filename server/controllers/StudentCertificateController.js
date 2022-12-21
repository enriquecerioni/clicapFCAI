const StudentCertificateModel = require("../models/StudentCertificateModel");

exports.create = async (req, res) => {
  const { certificateId, userId } = req.body;
  const certificate = await StudentCertificateModel.create({
    certificateId,
    userId,
  });
  if (certificate) {
    res.status(200).send("Certificado creado!");
  } else {
    res.status(500).json({ msg: "Error al crear el certificado." });
  }
};
exports.updateById = async (req, res) => {
  const { id } = req.params;
  const { certificateId, userId } = req.body;

  const certificate = await StudentCertificateModel.update(
    {
      certificateId,
      userId,
    },
    { where: { id: id } }
  );
  if (certificate) {
    res.status(200).json("Certificado editado!");
  } else {
    res.status(500).json({ msg: "El certificado no existe!" });
  }
};
exports.getById = async (req, res) => {
  const { id } = req.params;
  const certificate = await StudentCertificateModel.findByPk(id);

  if (certificate) {
    res.status(200).json({ response: certificate });
  } else {
    res.status(500).json({ msg: "Error al obtener el certificado." });
  }
};
exports.getAll = async (req, res) => {
  const certificate = await StudentCertificateModel.findAll();
  if (certificate) {
    res.status(200).json({ response: certificate });
  } else {
    res.status(500).json({ msg: "Error al obtener los pagos." });
  }
};
exports.deleteById = async (req, res) => {
  const { id } = req.params;
  const cerificate = await StudentCertificateModel.destroy({
    where: { id: id },
  });

  if (cerificate) {
    res.status(200).send("Certificado eliminado!");
  } else {
    res.status(500).json({ msg: "Error al eliminar el certificado." });
  }
};