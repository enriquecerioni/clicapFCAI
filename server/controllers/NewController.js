const NewModel = require("../models/NewModel");
const multer = require("multer");
const path = require("path");
const uuid = require("uuid");
const fs = require("fs");

var jobUUID;

// function to encode file data to base64 encoded string
function base64_encode(file) {
  // read binary data
  var bitmap = fs.readFileSync(file);
  // convert binary data to base64 encoded string
  return new Buffer(bitmap).toString("base64");
}

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
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png|gif/;
    const mimetype = fileTypes.test(file.mimetype);
    const extname = fileTypes.test(path.extname(file.originalname));
    if(mimetype && extname){
      return cb(null, true);
    }
    cb("Error: el archivo debe ser una imagen valida (.jpeg|.jpg|.png|.gif)");
  }
}).single("urlFile");

exports.create = async (req, res) => {
  try {
    createNews(req, res, async (err) => {
      if (err) {
        err.message = "The file is so heavy for my service";
        return res.status(500).json({ msg: err.message });
      }
      const imgbase64 = base64_encode(
        path.join(__dirname, `../public/news/${jobUUID}`)
      );
      const { title, content } = req.body;
      const news = await NewModel.create({
        title,
        content,
        urlFile: jobUUID,
        imgbase64: imgbase64,
      });
      if (news) {
        res.status(200).send("Nueva novedad creada!");
      } else {
        res.status(500).json({ msg: "Error al crear la novedad" });
      }
    });
  } catch (error) {
    console.log("Error al crear la novedad" + error);
  }
};

exports.getAllNews = async (req, res) => {
  try {
    const news = await NewModel.findAll();

    if (news) {
      res.status(200).json({ response: news });
    } else {
      res.status(500).json({ msg: "Error al obtener las novedades." });
    }
  } catch (error) {
    console.log("Error al obtener las novedades." + error);
  }
};

exports.delete = async (req, res) => {
  try {
    const { id } = req.params;
    const newDeleted = await NewModel.destroy({
      where: { id: id },
    });

    if (newDeleted) {
      res.status(200).send("Novedad eliminada correctamente!");
    } else {
      res.status(500).json({ msg: "Error al eliminar la novedad." });
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ msg: "Error al eliminar la novedad." });
  }
};

exports.getImage = async (req, res) => {
  try {
    const { id } = req.params;
    const imgbase64 = base64_encode(
      path.join(__dirname, `../assets/news/${urlFile}`)
    );
  } catch (error) {
    console.log(error)
  }
};
