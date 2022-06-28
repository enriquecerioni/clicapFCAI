const UserModel = require("../models/UserModel");
exports.create = async (req, res) => {
  const {
    name,
    surname,
    email,
    role,
    identifyType,
    identifyNumber,
    address,
    institution,
    phone,
    password,
  } = req.body;
  const user = await UserModel.create({
    name: name,
  });
  if (user) {
    res.status(200).send("Nuevo usuario creado!");
  } else {
    res.status(500).json({ msg: "Error al crear el usuario" });
  }
};
exports.updateById = async (req, res) => {
  const { id } = req.params;
  const {
    name,
    surname,
    email,
    role,
    identifyType,
    identifyNumber,
    address,
    institution,
    phone,
    password,
  } = req.body;

  const user = await UserModel.update(
    {
      name: name,
      surname: surname,
      email: email,
      role: role,
      identifyType: identifyType,
      identifyNumber: identifyNumber,
      address: address,
      institution: institution,
      phone: phone,
      password: password,
    },
    { where: { id: id } }
  );
  if (user) {
    res.status(200).json("Usuario editado correctamente!");
  } else {
    res.status(500).json({ msg: "El usuario no existe!" });
  }
};
exports.getById = async (req, res) => {
  const { id } = req.params;
  const user = await UserModel.findByPk(id);

  if (user) {
    res.status(200).json({ response: user });
  } else {
    res.status(500).json({ msg: "Error al obtener el usuario." });
  }
};
exports.getAll = async (req, res) => {
  const user = await UserModel.findAll();
  if (user) {
    res.status(200).json({ response: user });
  } else {
    res.status(500).json({ msg: "Error al obtener los usuarios." });
  }
};
exports.deleteById = async (req, res) => {
  const { id } = req.params;
  const user = await UserModel.destroy({
    where: { id: id },
  });

  if (user) {
    res.status(200).send("Usuario eliminado correctamente!");
  } else {
    res.status(500).json({ msg: "Error al eliminar el usuario." });
  }
};
