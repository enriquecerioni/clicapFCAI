const DateModel = require("../models/DateModel");

exports.getEventDate = async (req, res) => {
  try {
    const date = await DateModel.findOne();
    if (date) {
      res.status(200).json({ response: date });
    }
  } catch (error) {
    console.log("Error al obtener la fecha.");
  }
};

exports.updateDate = async (req, res) => {
  try {
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
  } catch (error) {
    console.log("El fecha no existe!");
  }
};

exports.updateDeadlineDays = async (req, res) => {
  try {
    const { days } = req.params;
    const currentDate = await DateModel.findOne();

    const date = await DateModel.update(
      {
        deadlineDays: days,
      },
      { where: { id: currentDate.id } }
    );
    if (date) {
      res.status(200).json("Número de días previos al evento editado correctamente!");
    } else {
      res.status(500).json({ msg: "EL número de dias previos al evento no existe!" });
    }
  } catch (error) {
    console.log("EL número de dias previos al evento no existe!", error);
  }
};
