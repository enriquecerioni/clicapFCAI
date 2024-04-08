const PaymentModel = require("../models/PaymentModel");

exports.create = async (req, res) => {
  try {
    const { name } = req.body;
    const payment = await PaymentModel.create({
      name: name,
    });
    if (payment) {
      res.status(200).send("Nuevo arancel creada!");
    } else {
      res.status(500).json({ msg: "Error al crear el arancel" });
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ msg: "Error al eliminar el arancel." });
  }
};

exports.updateById = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const payment = await PaymentModel.update(
      {
        name: name,
      },
      { where: { id: id } }
    );
    if (payment) {
      res.status(200).json("Arancel editado correctamente!");
    } else {
      res.status(500).json({ msg: "El arancel no existe!" });
    }
  } catch (error) {
    console.log("El arancel no existe!");
  }
};

exports.getById = async (req, res) => {
  try {
    const { id } = req.params;
    const payment = await PaymentModel.findByPk(id);

    if (payment) {
      res.status(200).json({ response: payment });
    } else {
      res.status(500).json({ msg: "Error al obtener el arancel." });
    }
  } catch (error) {
    console.log("Error al obtener el arancel." + error);
  }
};

exports.getAll = async (req, res) => {
  try {
    const payments = await PaymentModel.findAll();
    if (payments) {
      res.status(200).json({ response: payments });
    } else {
      res.status(500).json({ msg: "Error al obtener los aranceles." });
    }
  } catch (error) {
    console.log("Error al obtener los aranceles.");
  }
};

exports.deleteById = async (req, res) => {
  try {
    const { id } = req.params;
    const payment = await PaymentModel.destroy({
      where: { id: id },
    });

    if (payment) {
      res.status(200).send("Arancel eliminado correctamente!");
    } else {
      res.status(500).json({ msg: "Error al eliminar el arancel." });
    }
  } catch (error) {
    console.log("Error al eliminar el arancel.")
  }
};
