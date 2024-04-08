const JobModalityModel = require("../models/JobModalityModel");

exports.create = async (req, res) => {
  try {
    const { name } = req.body;
    const modality = await JobModalityModel.create({
      name: name,
    });
    if (modality) {
      res.status(200).send("Nueva modalidad creada!");
    } else {
      res.status(500).json({ msg: "Error al crear la modalidad" });
    }
  } catch (error) {
    console.log("Error al crear la modalidad " + error);
  }
};

exports.updateById = async (req, res) => {
  try {
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
  } catch (error) {
    console.log("La modalidad no existe!");
  }
};

exports.getById = async (req, res) => {
  try {
    const { id } = req.params;
    const modality = await JobModalityModel.findByPk(id);

    if (modality) {
      res.status(200).json({ response: modality });
    } else {
      res.status(500).json({ msg: "Error al obtener La modalidad." });
    }
  } catch (error) {
    console.log("Error al obtener La modalidad." + error);
  }
};

exports.getAll = async (req, res) => {
  try {
    const modalities = await JobModalityModel.findAll();
    if (modalities) {
      res.status(200).json({ response: modalities });
    } else {
      res.status(500).json({ msg: "Error al obtener las modalidades." });
    }
  } catch (error) {
    console.log("Error al obtener las modalidades.");
  }
};

exports.deleteById = async (req, res) => {
  try {
    const { id } = req.params;
    const modality = await JobModalityModel.destroy({
      where: { id: id },
    });

    if (modality) {
      res.status(200).send("Modalidad eliminada correctamente!");
    } else {
      res.status(500).json({ msg: "Error al eliminar la modalidad." });
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ msg: "Error al eliminar la modalidad." });
  }
};
