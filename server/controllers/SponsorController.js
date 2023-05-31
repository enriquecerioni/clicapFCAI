const SponsorModel = require("../models/SponsorModel");
const multer = require("multer");
const path = require("path");
const uuid = require("uuid");
const fs = require("fs");

var sponsorUUID;

// function to encode file data to base64 encoded string
function base64_encode(file) {
  // read binary data
  var bitmap = fs.readFileSync(file);
  // convert binary data to base64 encoded string
  return new Buffer(bitmap).toString("base64");
}

// Multer Config Sponsors
const storage = multer.diskStorage({
  destination: path.join(__dirname, "../public/sponsors"),
  filename: (req, file, cb) => {
    sponsorUUID = uuid.v4() + path.extname(file.originalname);
    cb(null, sponsorUUID);
  },
});
const createSponsor = multer({
  storage,
  limits: { fileSize: 1000000 },
}).single("urlFile");

exports.create = async (req, res) => {
  try {
    createSponsor(req, res, async (err) => {
      if (err) {
        err.message = "The file is so heavy for my service";
        return res.send(err);
      }
      console.log("SPONSOR UUID", sponsorUUID);
      const imgbase64 = base64_encode(
        path.join(__dirname, `../public/sponsors/${sponsorUUID}`)
      );
      const { name, link, type } = req.body;
      const sponsor = await SponsorModel.create({
        name,
        link,
        type,
        urlFile: sponsorUUID,
        imgbase64: "data:image/png;base64," + imgbase64,
      });
      if (sponsor) {
        res.status(200).send("Nuevo sponsor/aval creado!");
      } else {
        res.status(500).json({ msg: "Error al crear el sponsor" });
      }
    });
  } catch (error) {
    console.log("Error al crear el sponsor/aval" + error);
  }
};

exports.getAll = async (req, res) => {
  try {
    let sponsors;
    const { type } = req.query;
    if (type === "All") {
      sponsors = await SponsorModel.findAll();
    } else if (type === "Aval") {
      sponsors = await SponsorModel.findAll({
        where: { type: "Aval" },
      });
    } else {
      sponsors = await SponsorModel.findAll({
        where: { type: "Sponsor" },
      });
    }

    if (sponsors) {
      res.status(200).json({ response: sponsors });
    } else {
      res.status(500).json({ msg: "Error al obtener los sponsors." });
    }
  } catch (error) {
    console.log("Error al obtener los sponsors." + error);
  }
};

exports.delete = async (req, res) => {
  try {
    const { id } = req.params;
    const sponsorDeleted = await SponsorModel.destroy({
      where: { id: id },
    });

    if (sponsorDeleted) {
      res.status(200).send("Sponsor/Aval eliminado correctamente!");
    } else {
      res.status(500).json({ msg: "Error al eliminar el sponsor/aval." });
    }
  } catch (error) {
    console.log("Error al eliminar el sponsor/aval.");
  }
};
