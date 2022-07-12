const RoleModel = require("../models/RoleModel");
exports.create = async (req, res) => {
  const { name } = req.body;
  const role = await RoleModel.create({
    name: name,
  });
  if (role) {
    res.status(200).send("Rol creado!");
  } else {
    res.status(500).json({ msg: "Error al crear el área" });
  }
};
exports.updateById = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  const role = await RoleModel.update(
    {
      name: name,
    },
    { where: { id: id } }
  );
  if (role) {
    res.status(200).json("Rol editada correctamente!");
  } else {
    res.status(500).json({ msg: "El rol no existe!" });
  }
};
exports.getById = async (req, res) => {
  const { id } = req.params;
  const role = await RoleModel.findByPk(id);

  if (role) {
    res.status(200).json({ response: role });
  } else {
    res.status(500).json({ msg: "Error al obtener el rol." });
  }
};
exports.getAll = async (req, res) => {
  const role = await RoleModel.findAll();
  if (role) {
    res.status(200).json({ response: role });
  } else {
    res.status(500).json({ msg: "Error al obtener las roles." });
  }
};
exports.deleteById = async (req, res) => {
  const { id } = req.params;
  const role = await RoleModel.destroy({
    where: { id: id },
  });

  if (role) {
    res.status(200).send("Rol eliminado correctamente!");
  } else {
    res.status(500).json({ msg: "Error al eliminar el rol." });
  }
};