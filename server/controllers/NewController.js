const NewModel = require("../models/NewModel");

exports.create = async (req, res) => {
    const { title, content } = req.body;
    const news = await NewModel.create({
        title,
        content
    });
    if (news) {
        res.status(200).send("Nueva novedad creada!");
    } else {
        res.status(500).json({ msg: "Error al crear la novedad" });
    }
};

exports.getAllNews = async (req, res) => {
    const news = await NewModel.findAll();
    if (news) {
        res.status(200).json({ response: news });
    } else {
        res.status(500).json({ msg: "Error al obtener la fecha." });
    }
};

exports.delete = async (req, res) => {
    const { id } = req.params;
    const newDeleted = await NewModel.destroy({
        where: { id: id },
    });

    if (newDeleted) {
        res.status(200).send("Novedad eliminada correctamente!");
    } else {
        res.status(500).json({ msg: "Error al eliminar la novedad." });
    }
};
