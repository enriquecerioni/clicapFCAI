const DocumentModel = require("../models/DocumentModel");
exports.create = async (req, res) => {
  const {
    name,
    areaId,
    authorId,
    members,
    urlFile,
    evaluatorId1,
    evaluatorId2,
  } = req.body;
  const doc = await DocumentModel.create({
    name: name,
    areaId: areaId,
    members: members,
    authorId: authorId,
    urlFile: urlFile,
    evaluatorId1: evaluatorId1,
    evaluatorId2: evaluatorId2,
  });
  if (doc) {
    res.status(200).send("Documento creado!");
  } else {
    res.status(500).json({ msg: "Error al crear el documento." });
  }
};
exports.updateById = async (req, res) => {
  const { id } = req.params;
  const {
    name,
    areaId,
    authorId,
    members,
    urlFile,
    evaluatorId1,
    evaluatorId2,
  } = req.body;

  const doc = await DocumentModel.update(
    {
      name: name,
      areaId: areaId,
      members: members,
      authorId: authorId,
      urlFile: urlFile,
      evaluatorId1: evaluatorId1,
      evaluatorId2: evaluatorId2,
    },
    { where: { id: id } }
  );
  if (doc) {
    res.status(200).json("Documento editado!");
  } else {
    res.status(500).json({ msg: "El documento no existe!" });
  }
};
exports.getById = async (req, res) => {
  const { id } = req.params;
  const doc = await DocumentModel.findByPk(id);

  if (doc) {
    res.status(200).json({ response: doc });
  } else {
    res.status(500).json({ msg: "Error al obtener el documento." });
  }
};
exports.getAll = async (req, res) => {
  const doc = await DocumentModel.findAll();
  if (doc) {
    res.status(200).json({ response: doc });
  } else {
    res.status(500).json({ msg: "Error al obtener los documentos." });
  }
};
exports.deleteById = async (req, res) => {
  const { id } = req.params;
  const doc = await DocumentModel.destroy({
    where: { id: id },
  });

  if (doc) {
    res.status(200).send("Documento eliminado!");
  } else {
    res.status(500).json({ msg: "Error al eliminar el documento." });
  }
};
