const NewModel = require("../models/NewModel");
const multer = require("multer");
const path = require("path");
const uuid = require("uuid");

var jobUUID;

// Multer Config News
const storage = multer.diskStorage({
    destination: path.join(__dirname, "../public/news"),
    filename: (req, file, cb) => {
        jobUUID = uuid.v4() + path.extname(file.originalname);
        cb(null, jobUUID);
    },
});
const createNews = multer({
    storage,
    limits: { fileSize: 1000000 },
}).single("urlFile");

exports.create = async (req, res) => {
    createNews(req, res, async (err) => {
        if (err) {
            err.message = "The file is so heavy for my service";
            return res.send(err);
        }
        const {
            title,
            content
        } = req.body;
        const news = await NewModel.create({
            title,
            content,
            urlFile: jobUUID
        });
        if (news) {
            res.status(200).send("Nueva novedad creada!");
        } else {
            res.status(500).json({ msg: "Error al crear la novedad" });
        }
    });
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
