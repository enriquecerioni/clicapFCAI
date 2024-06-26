const CertificateModel = require("../models/CertificateModel");
const StudentCertificateModel = require("../models/StudentCertificateModel");
const path = require("path");
const fs = require("fs");
const multer = require("multer");
// function to encode file data to base64 encoded string
function base64_encode(file) {
  // read binary data
  var bitmap = fs.readFileSync(file);
  // convert binary data to base64 encoded string
  return new Buffer(bitmap).toString("base64");
}

// Multer Config News
const storage = multer.diskStorage({
  destination: path.join(__dirname, "../public/logos"),
  filename: (req, file, cb) => {
    if (req.body.name === "certificateLogo") {
      cb(null, "certificateLogo.jpg");
    } else {
      cb(null, "appLogo.jpg");
    }
  },
});
const saveLogo = multer({
  storage,
  limits: { fileSize: 1000000 },
}).single("urlFile");

exports.create = async (req, res) => {
  try {
    const { type, name, jobtext, text, introtext } = req.body;
    const certificate = await CertificateModel.create({
      type,
      name,
      jobtext,
      text,
      introtext,
    });
    if (certificate) {
      res.status(200).json({ msg: "Nuevo certificado creado!" });
    } else {
      res.status(500).json({ msg: "Error al crear el certificado" });
    }
  } catch (error) {
    console.log("Error al crear el certificado.");
  }
};

exports.updateById = async (req, res) => {
  try {
    const { id } = req.params;
    const { type, name, jobtext, text, introtext } = req.body;

    const certificate = await CertificateModel.update(
      {
        type,
        name,
        jobtext,
        text,
        introtext,
      },
      { where: { id: id } }
    );
    if (certificate) {
      res.status(200).json({ msg: "Certificado editado!" });
    } else {
      res.status(500).json({ msg: "El certificado no existe!" });
    }
  } catch (error) {
    console.log("El certificado no existe!");
  }
};

exports.getById = async (req, res) => {
  try {
    const { id } = req.params;
    const certificate = await CertificateModel.findByPk(id);

    if (certificate) {
      res.status(200).json({ response: certificate });
    } else {
      res.status(500).json({ msg: "Error al obtener el certificado." });
    }
  } catch (error) {
    console.log("Error al obtener el certificado.");
  }
};

exports.getAll = async (req, res) => {
  try {
    const certificate = await CertificateModel.findAll();
    if (certificate) {
      res.status(200).json({ response: certificate });
    } else {
      res.status(500).json({ msg: "Error al obtener los certificados." });
    }
  } catch (error) {
    console.log("Error al obtener los certificados.");
  }
};

exports.getCertificateLogo = async (req, res) => {
  const { name } = req.params;
  try {
    const imgbase64 = base64_encode(
      path.join(__dirname, `../public/logos/${name}.jpg`)
    );
    if (imgbase64 !== null || imgbase64 !== undefined) {
      res.status(200).json({ response: imgbase64 });
    }
  } catch (error) {
    res.status(200).json({ response: "" });
  }
};
exports.deleteById = async (req, res) => {
  try {
    const { id } = req.params;
    await StudentCertificateModel.destroy({
      where: { certificateId: id },
    });

    const certificate = await CertificateModel.destroy({
      where: { id: id },
    });

    if (certificate) {
      res.status(200).send("Certificado eliminado correctamente!");
    } else {
      res.status(500).json({ msg: "Error al eliminar el certificado." });
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ msg: "Error al eliminar el certificado." });
  }
};

exports.saveLogosApp = async (req, res) => {
  try {
    saveLogo(req, res, async (err) => {
      if (err) {
        err.message = "The file is so heavy for my service";
        return res.send(err);
      }
      res.status(200).json({ msg: "Imagen guarda!" });
    });
  } catch (error) {
    console.log("Error al guardar la imagen.");
  }
};
