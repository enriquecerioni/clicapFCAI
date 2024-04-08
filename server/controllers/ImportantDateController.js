const ImportantDateModel = require("../models/ImportantDates");

exports.create = async (req, res) => {
  try {
    const { title, description } = req.body;
    const date = await ImportantDateModel.create({
      title,
      description,
    });
    if (date) {
      res.status(200).json({ msg: "Fecha importante creada!" });
    } else {
      res.status(500).json({ msg: "Error al crear la fecha importante" });
    }
  } catch (error) {
    console.log("Error al crear la fecha importante: " + error);
  }
};
exports.updateById = async (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;

  const date = await ImportantDateModel.update(
    {
      title,
      description,
    },
    { where: { id: id } }
  );
  if (date) {
    res.status(200).json({ msg: "Fecha importante editada!" });
  } else {
    res.status(500).json({ msg: "La fecha importante no existe!" });
  }
};
exports.getById = async (req, res) => {
  const { id } = req.params;
  const date = await ImportantDateModel.findByPk(id);

  if (date) {
    res.status(200).json({ response: date });
  } else {
    res.status(500).json({ msg: "Error al obtener la fecha importante." });
  }
};
exports.getAll = async (req, res) => {
  try {
    const date = await ImportantDateModel.findAll();
    if (date) {
      res.status(200).json({ response: date });
    } else {
      res.status(500).json({ msg: "Error al obtener las fechas importantes." });
    }
  } catch (error) {
    console.log("Error al obtener las fechas importantes.");
  }
};
exports.deleteById = async (req, res) => {
  try {
    const { id } = req.params;
    const date = await ImportantDateModel.destroy({
      where: { id: id },
    });

    if (date) {
      res.status(200).json({ msg: "Fecha importante eliminada!" });
    } else {
      res.status(500).json({ msg: "Error al eliminar la fecha importante." });
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ msg: "Error al eliminar la fecha importante." });
  }
};
