const PayModel = require("../models/PayModel");
exports.create = async (req, res) => {
  const {
    amount,
    moneyType,
    payType,
    cuitCuil,
    iva,
    detail,
    urlFile,
    authorId,
  } = req.body;
  const pay = await PayModel.create({
    amount: amount,
    moneyType: moneyType,
    payType: payType,
    cuitCuil: cuitCuil,
    iva: iva,
    detail: detail,
    urlFile: urlFile,
    authorId: authorId,
  });
  if (pay) {
    res.status(200).send("Pago creado!");
  } else {
    res.status(500).json({ msg: "Error al crear el pago." });
  }
};
exports.updateById = async (req, res) => {
  const { id } = req.params;
  const {
    amount,
    moneyType,
    payType,
    cuitCuil,
    iva,
    detail,
    urlFile,
    authorId,
  } = req.body;

  const pay = await PayModel.update(
    {
      amount: amount,
      moneyType: moneyType,
      payType: payType,
      cuitCuil: cuitCuil,
      iva: iva,
      detail: detail,
      urlFile: urlFile,
      authorId: authorId,
    },
    { where: { id: id } }
  );
  if (pay) {
    res.status(200).json("Pago editado!");
  } else {
    res.status(500).json({ msg: "El pago no existe!" });
  }
};
exports.getById = async (req, res) => {
  const { id } = req.params;
  const pay = await PayModel.findByPk(id);

  if (pay) {
    res.status(200).json({ response: pay });
  } else {
    res.status(500).json({ msg: "Error al obtener el pago." });
  }
};
exports.getAll = async (req, res) => {
  const pay = await PayModel.findAll();
  if (pay) {
    res.status(200).json({ response: pay });
  } else {
    res.status(500).json({ msg: "Error al obtener los pagos." });
  }
};
exports.deleteById = async (req, res) => {
  const { id } = req.params;
  const pay = await PayModel.destroy({
    where: { id: id },
  });

  if (pay) {
    res.status(200).send("Pago eliminado!");
  } else {
    res.status(500).json({ msg: "Error al eliminar el pago." });
  }
};
