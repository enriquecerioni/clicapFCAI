const AreaModel = require("../models/AreaModel");
exports.create = async (req, res) => {
  try {
    const { name } = req.body;
    const area = await AreaModel.create({
      name: name,
    });
    if (area) {
      res.status(200).json({ msg: "Nueva área creada!" });
    } else {
      res.status(500).json({ msg: "Error al crear el área" });
    }
  } catch (error) {
    console.log("Error al crear el área: " + error);
  }
};
exports.updateById = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  const area = await AreaModel.update(
    {
      name: name,
    },
    { where: { id: id } }
  );
  if (area) {
    res.status(200).json("Área editada correctamente!");
  } else {
    res.status(500).json({ msg: "El área no existe!" });
  }
};
exports.getById = async (req, res) => {
  const { id } = req.params;
  const area = await AreaModel.findByPk(id);

  if (area) {
    res.status(200).json({ response: area });
  } else {
    res.status(500).json({ msg: "Error al obtener el área." });
  }
};
exports.getAll = async (req, res) => {
  try {
    const area = await AreaModel.findAll();
    if (area) {
      res.status(200).json({ response: area });
    } else {
      res.status(500).json({ msg: "Error al obtener las áreas." });
    }
  } catch (error) {
    console.log("Error al obtener las áreas.");
  }
};
exports.deleteById = async (req, res) => {
  try {
    const { id } = req.params;
    const area = await AreaModel.destroy({
      where: { id: id },
    });

    if (area) {
      res.status(200).send("Área eliminada correctamente!");
    } else {
      res.status(500).json({ msg: "Error al eliminar el área." });
    }
  } catch (error) {
    console.log("Error al eliminar el área.")
  }
};
