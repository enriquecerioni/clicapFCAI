const JobModalityModel = require("../models/JobModalityModel");
exports.create = async (req, res) => {
  const { name } = req.body;
  const modality = await JobModalityModel.create({
    name: name,
  });
  if (modality) {
    res.status(200).send("Nueva modalidad creada!");
  } else {
    res.status(500).json({ msg: "Error al crear la modalidad" });
  }
};
exports.updateById = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  const modality = await JobModalityModel.update(
    {
      name: name,
    },
    { where: { id: id } }
  );
  if (modality) {
    res.status(200).json("Modalidad editada correctamente!");
  } else {
    res.status(500).json({ msg: "La modalidad no existe!" });
  }
};
exports.getById = async (req, res) => {
  const { id } = req.params;
  const modality = await JobModalityModel.findByPk(id);

  if (modality) {
    res.status(200).json({ response: modality });
  } else {
    res.status(500).json({ msg: "Error al obtener La modalidad." });
  }
};
exports.getAll = async (req, res) => {
  const modalities = await JobModalityModel.findAll();
  if (modalities) {
    res.status(200).json({ response: modalities });
  } else {
    res.status(500).json({ msg: "Error al obtener las modalidades." });
  }
};
exports.deleteById = async (req, res) => {
  const { id } = req.params;
  const modality = await JobModalityModel.destroy({
    where: { id: id },
  });

  if (modality) {
    res.status(200).send("Modalidad eliminada correctamente!");
  } else {
    res.status(500).json({ msg: "Error al eliminar La modalidad." });
  }
};
