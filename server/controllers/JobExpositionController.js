const JobExpositionModel = require("../models/JobExpositionModel");

exports.create = async (req, res) => {
  try {
    const { name } = req.body;
    const exposition = await JobExpositionModel.create({
      name: name,
    });
    if (exposition) {
      res.status(200).send("Nueva exposición creada!");
    } else {
      res.status(500).json({ msg: "Error al crear la exposición" });
    }
  } catch (error) {
    console.log("Error al crear la exposición " + error);
  }
};

exports.updateById = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const exposition = await JobExpositionModel.update(
      {
        name: name,
      },
      { where: { id: id } }
    );
    if (exposition) {
      res.status(200).json("Exposición editada correctamente!");
    } else {
      res.status(500).json({ msg: "La exposición no existe!" });
    }
  } catch (error) {
    console.log("La exposición no existe!");
  }
};

exports.getById = async (req, res) => {
  try {
    const { id } = req.params;
    const exposition = await JobExpositionModel.findByPk(id);

    if (exposition) {
      res.status(200).json({ response: exposition });
    } else {
      res.status(500).json({ msg: "Error al obtener La exposición." });
    }
  } catch (error) {
    console.log("Error al obtener La exposición." + error);
  }
};

exports.getAll = async (req, res) => {
  try {
    const expositions = await JobExpositionModel.findAll();
    if (expositions) {
      res.status(200).json({ response: expositions });
    } else {
      res.status(500).json({ msg: "Error al obtener las exposiciones." });
    }
  } catch (error) {
    console.log("Error al obtener las exposiciones.");
  }
};

exports.deleteById = async (req, res) => {
  try {
    const { id } = req.params;
    const exposition = await JobExpositionModel.destroy({
      where: { id: id },
    });

    if (exposition) {
      res.status(200).send("Exposición eliminada correctamente!");
    } else {
      res.status(500).json({ msg: "Error al eliminar la exposición." });
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ msg: "Error al eliminar la exposición." });
  }
};
