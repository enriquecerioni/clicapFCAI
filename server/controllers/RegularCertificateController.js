const RegularCertificate = require("../models/RegularCertificateModel");
const multer = require("multer");
const path = require("path");
const Sequelize = require("sequelize");
const UserModel = require("../models/UserModel");
const { PAGE_LIMIT } = process.env;
const { calcNumOffset, calcTotalPages } = require("../helpers/helpers");
const uuid = require("uuid");
const RegularCertificateModel = require("../models/RegularCertificateModel");

var jobUUID;

// Multer Config Regular Certificates
const storage = multer.diskStorage({
  destination: path.join(__dirname, "../public/regularcertificates"),
  filename: (req, file, cb) => {
    jobUUID = uuid.v4() + path.extname(file.originalname);
    cb(null, jobUUID);
  },
});
const createRegularCertificate = multer({
  storage,
  limits: { fileSize: 1000000 },
}).single("urlFile");

exports.create = async (req, res) => {
  try {
    createRegularCertificate(req, res, async (err) => {
      if (err) {
        err.message = "The file is so heavy for my service";
        return res.send(err);
      }
      const { detail, authorId } = req.body;
      const certificate = await RegularCertificate.create({
        detail: detail,
        urlFile: jobUUID,
        authorId: authorId,
      });
      if (certificate) {
        return res.status(200).json({ msg: "Certificado AR añadido!" });
      } else {
        return res
          .status(500)
          .json({ msg: "Error al crear el certificado de AR." });
      }
    });
  } catch (error) {
    return res
      .status(500)
      .json({ msg: "Error al crear el certificado de AR." });
  }
};

// exports.updateById = async (req, res) => {
//   const { id } = req.params;
//   const {
//     detail,
//     urlFile,
//     authorId,
//   } = req.body;

//   const pay = await RegularCertificate.update(
//     {
//       amount: amount,
//       moneyType: moneyType,
//       payType: payType,
//       cuitCuil: cuitCuil,
//       iva: iva,
//       detail: detail,
//       urlFile: urlFile,
//       authorId: authorId,
//     },
//     { where: { id: id } }
//   );
//   if (pay) {
//     res.status(200).json("Pago editado!");
//   } else {
//     res.status(500).json({ msg: "El pago no existe!" });
//   }
// };
exports.getById = async (req, res) => {
  const { id } = req.params;
  const certificate = await RegularCertificate.findByPk(id);

  if (certificate) {
    res.status(200).json({ response: certificate });
  } else {
    res.status(500).json({ msg: "Error al obtener el certificado." });
  }
};
exports.getAll = async (req, res) => {
  const certificate = await RegularCertificate.findAll();
  if (certificate) {
    res.status(200).json({ response: certificate });
  } else {
    res.status(500).json({ msg: "Error al obtener los certificados." });
  }
};
exports.deleteById = async (req, res) => {
  const { id } = req.params;
  const certificate = await RegularCertificate.destroy({
    where: { id: id },
  });

  if (certificate) {
    res.status(200).send("Certificado eliminado!");
  } else {
    res.status(500).json({ msg: "Error al eliminar el certificado." });
  }
};

exports.getAllPaginated = async (req, res) => {
  const {
    authorId,
  } = req.query;
  const { page } = req.params;
  const Op = Sequelize.Op;
  const offsetIns = calcNumOffset(page);
  let options = {
    where: {},
    offset: offsetIns,
    limit: Number(PAGE_LIMIT),
  };

  if (authorId) {
    options.where.authorId = authorId;
  }

  const { count, rows } = await RegularCertificateModel.findAndCountAll(options);
  const cantPages = calcTotalPages(count);

  if (rows) {
    res.status(200).json({ pages: cantPages, response: rows });
  } else {
    res.status(500).json({ msg: "La instancia no existe." });
  }
};
