const StudentCertificateModel = require("../models/StudentCertificateModel");
const multer = require("multer");
const path = require("path");
const Sequelize = require("sequelize");
const UserModel = require("../models/UserModel");
const { PAGE_LIMIT } = process.env;
const { calcNumOffset, calcTotalPages } = require("../helpers/helpers");
// Multer Config
const storage = multer.diskStorage({
  destination: path.join(__dirname, "../public/student-certificates"),
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const createCertificate = multer({
  storage,
  limits: { fileSize: 1000000 },
}).single("urlFile");

exports.create = async (req, res) => {
  createCertificate(req, res, async (err) => {
    if (err) {
      err.message = "The file is so heavy for my service";
      return res.send(err);
    }
    const {
      detail,
      urlFile,
      authorId,
    } = req.body;
    const certificate = await StudentCertificateModel.create({
      detail: detail,
      urlFile: req.file.filename,
      authorId: authorId,
    });
    if (certificate) {
      res.status(200).send("Certificado creado!");
    } else {
      res.status(500).json({ msg: "Error al crear el certificado." });
    }
  });
};

// exports.create = async (req, res) => {
//   const {
//     amount,
//     moneyType,
//     payType,
//     cuitCuil,
//     iva,
//     detail,
//     urlFile,
//     authorId,
//   } = req.body;
//   const pay = await StudentCertificateModel.create({
//     amount: amount,
//     moneyType: moneyType,
//     payType: payType,
//     cuitCuil: cuitCuil,
//     iva: iva,
//     detail: detail,
//     urlFile: urlFile,
//     authorId: authorId,
//   });
//   if (pay) {
//     res.status(200).send("Pago creado!");
//   } else {
//     res.status(500).json({ msg: "Error al crear el pago." });
//   }
// };

exports.updateById = async (req, res) => {
  const { id } = req.params;
  const {
    detail,
    urlFile,
    authorId,
  } = req.body;

  const pay = await StudentCertificateModel.update(
    {
      detail: detail,
      urlFile: urlFile,
      authorId: authorId,
    },
    { where: { id: id } }
  );
  if (certificate) {
    res.status(200).json("Certificado editado!");
  } else {
    res.status(500).json({ msg: "El certificado no existe!" });
  }
};
exports.getById = async (req, res) => {
  const { id } = req.params;
  const certificate = await StudentCertificateModel.findByPk(id);

  if (certificate) {
    res.status(200).json({ response: certificate });
  } else {
    res.status(500).json({ msg: "Error al obtener el certificado." });
  }
};
exports.getAll = async (req, res) => {
  const certificate = await StudentCertificateModel.findAll();
  if (certificate) {
    res.status(200).json({ response: certificate });
  } else {
    res.status(500).json({ msg: "Error al obtener los pagos." });
  }
};
exports.deleteById = async (req, res) => {
  const { id } = req.params;
  const pay = await StudentCertificateModel.destroy({
    where: { id: id },
  });

  if (pay) {
    res.status(200).send("Certificado eliminado!");
  } else {
    res.status(500).json({ msg: "Error al eliminar el certificado." });
  }
};

exports.getAllPaginated = async (req, res) => {
  const { authorId, name, surname, areaId } = req.query;
  console.log(req.query);
  const { page } = req.params;

  const Op = Sequelize.Op;
  const offsetIns = calcNumOffset(page);
  let options = {
    where: {},
    include: [{ model: UserModel }],
    offset: offsetIns,
    limit: Number(PAGE_LIMIT),
  };

  // if (name) {
  //   options.where.name = {
  //     [Op.like]: `%${name}%`,
  //   };
  // }
  // if (surname) {
  //   options.where.surname = {
  //     [Op.like]: `%${surname}%`,
  //   };
  // }
  // if (authorId) {
  //   options.where.authorId = authorId;
  // }
  // if (areaId) {
  //   options.where.areaId = areaId;
  // }
  /* options.where = {
      [Op.or]: [
        { name: { [Op.like]: `%${name}%` } },
        { "$partner.name$": { [Op.like]: `%${name}%` } },
      ],
    }; */
  /*   if (sinceDateStart && untilDateStart) {
    options.where.startDate = {
      [Op.between]: [sinceDateStart, untilDateStart],
    };
  }
  if (sinceDateEnd && untilDateEnd) {
    options.where.endDate = { [Op.between]: [sinceDateEnd, untilDateEnd] };
  } */

  const { count, rows } = await StudentCertificateModel.findAndCountAll(options);
  const cantPages = calcTotalPages(count);

  if (rows) {
    res.status(200).json({ pages: cantPages, response: rows });
  } else {
    res.status(500).json({ msg: "La instancia no existe." });
  }
};