const DateModel = require("../models/DateModel");

exports.getEventDate = async (req, res) => {
  const date = await DateModel.findOne();
  console.log(date)
  if (date) {
    res.status(200).json({ response: date });
  } else {
    res.status(500).json({ msg: "Error al obtener la fecha." });
  }
};

exports.updateDate = async (req, res) => {
  const { timestamp } = req.params;
  const currentDate = await DateModel.findOne();

   const date = await DateModel.update(
    {
      date: timestamp,
    },
    { where: { id: currentDate.id } }
  );
  if (date) {
    res.status(200).json("Fecha editada correctamente!");
  } else {
    res.status(500).json({ msg: "El fecha no existe!" });
  }
};