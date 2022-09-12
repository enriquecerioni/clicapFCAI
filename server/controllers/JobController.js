const AreaModel = require("../models/AreaModel");
const JobModel = require("../models/JobModel");
const { PAGE_LIMIT } = process.env;
const multer = require("multer");
const path = require("path");
const UserModel = require("../models/UserModel");
const Sequelize = require("sequelize");
const JobModalityModel = require("../models/JobModalityModel");
const fs = require("fs");

// Multer Config
const storage = multer.diskStorage({
  destination: path.join(__dirname, "../public/documents"),
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const uploadJob = multer({
  storage,
  limits: { fileSize: 1000000 },
}).single("urlFile");

exports.upload = async (req, res) => {
  uploadJob(req, res, async (err) => {
    if (err) {
      err.message = "The file is so heavy for my service";
      return res.send(err);
    }
    const { name, areaId, authorId, members, jobModalityId } = req.body;
    // status 1 = No corregido | 0 = corregido
    const status = 1;
    let { evaluatorId1, evaluatorId2 } = req.body;

    if (evaluatorId1 === "") {
      evaluatorId1 = null;
    }
    if (evaluatorId2 === "") {
      evaluatorId2 = null;
    }

    const doc = await JobModel.create({
      name: name,
      jobModalityId,
      areaId: areaId,
      members: members,
      authorId: authorId,
      status,
      urlFile: req.file.filename,
      evaluatorId1,
      evaluatorId2,
    });
    if (doc) {
      return res.status(200).json({ msg: "Trabajo creado!" });
    } else {
      return res.status(500).json({ msg: "Error al crear el Trabajo." });
    }
  });
};
exports.downloadFile = (req, res) => {
  console.log("Descargo el archivo");
  const { nameFile } = req.query;
  const ruta = path.join(__dirname, `../public/documents/${nameFile}`);
  const file = fs.createReadStream(ruta);
  const filename = new Date().toISOString();
  res.setHeader(
    "Content-Disposition",
    'attachment: filename="' + filename + '"'
  );
  file.pipe(res);
};

exports.create = async (req, res) => {
  const { name, areaId, authorId, members, evaluatorId1, evaluatorId2 } =
    req.body;
  const doc = await JobModel.create({
    name: name,
    areaId: areaId,
    members: members,
    authorId: authorId,
    urlFile: req.file.filename,
    evaluatorId1: evaluatorId1,
    evaluatorId2: evaluatorId2,
  });
  if (doc) {
    res.status(200).send("Trabajo creado!");
  } else {
    res.status(500).json({ msg: "Error al crear el Trabajo." });
  }
};
exports.updateById = async (req, res) => {
  const { id } = req.params;
  const {
    name,
    areaId,
    authorId,
    members,
    urlFile,
    status,
    evaluatorId1,
    evaluatorId2,
  } = req.body;

  const doc = await JobModel.update(
    {
      name: name,
      areaId: areaId,
      members: members,
      authorId: authorId,
      status,
      urlFile: urlFile,
      evaluatorId1: evaluatorId1,
      evaluatorId2: evaluatorId2,
    },
    { where: { id: id } }
  );
  if (doc) {
    res.status(200).json({ msg: "Trabajo editado!" });
  } else {
    res.status(500).json({ msg: "El Trabajo no existe!" });
  }
};
exports.getById = async (req, res) => {
  const { id } = req.params;
  const doc = await JobModel.findAll({
    where: { id },
    include: [
      { model: AreaModel },
      { model: JobModalityModel },
      { model: UserModel, as: "author" },
      { model: UserModel, as: "evaluator1" },
      { model: UserModel, as: "evaluator2" },
    ],
  });

  if (doc) {
    res.status(200).json({ response: doc });
  } else {
    res.status(500).json({ msg: "Error al obtener el Trabajo." });
  }
};
exports.getAll = async (req, res) => {
  const doc = await JobModel.findAll({
    include: [
      { model: UserModel, as: "author" },
      { model: AreaModel },
      { model: UserModel, as: "evaluator1" },
      { model: UserModel, as: "evaluator2" },
    ],
  });
  if (doc) {
    res.status(200).json({ response: doc });
  } else {
    res.status(500).json({ msg: "Error al obtener los Trabajos." });
  }
};
exports.deleteById = async (req, res) => {
  const { id } = req.params;
  const doc = await JobModel.destroy({
    where: { id: id },
  });

  if (doc) {
    res.status(200).send("Trabajo eliminado!");
  } else {
    res.status(500).json({ msg: "Error al eliminar el Trabajo." });
  }
};
const calcNumOffset = (page) => {
  //calculo el numero del offset
  let numOffset = (Number(page) - 1) * Number(PAGE_LIMIT);
  return numOffset;
};
const calcTotalPages = (totalItems) => {
  //Cantidad de paginas en total
  const cantPages = Math.ceil(totalItems / Number(PAGE_LIMIT));
  return cantPages;
};
/* exports.getDocumentPaginated = async (req, res) => {
  try {
    const { page } = req.params;
    const offsetIns = calcNumOffset(page);
    let { count, rows } = await JobModel.findAndCountAll({
      include: [{ model: AreaModel }],
      offset: offsetIns,
      limit: Number(PAGE_LIMIT),
    });
    const cantPages = calcTotalPages(count);
    if (rows) {
      res.status(200).json({ pages: cantPages, response: rows });
    } else {
      res.status(500).json({ msg: "Los Trabajos no existen." });
    }
  } catch (e) {
    console.log(e);
    return res.status(503).json({ msg: "Fallo en el servidor" });
  }
}; */
exports.getAllPaginated = async (req, res) => {
  const { authorId, name, surname, areaId, evaluatorId1, evaluatorId2 } =
    req.query;
  console.log(req.query);
  const { page } = req.params;
  const Op = Sequelize.Op;
  const offsetIns = calcNumOffset(page);
  let options = {
    where: {},
    include: [
      { model: AreaModel },
      { model: JobModalityModel },
      {
        model: UserModel,
        as: "author",
        attributes: ["name", "surname"],
      },
      { model: UserModel, as: "evaluator1", attributes: ["name", "surname"] },
      { model: UserModel, as: "evaluator2", attributes: ["name", "surname"] },
    ],
    offset: offsetIns,
    limit: Number(PAGE_LIMIT),
  };

  if (name) {
    options.where.name = {
      [Op.like]: `%${name}%`,
    };
  }
  if (surname) {
    options.where.surname = {
      [Op.like]: `%${surname}%`,
    };
  }
  if (authorId) {
    options.where.authorId = authorId;
  }
  if (evaluatorId1) {
    options.where.evaluatorId1 = evaluatorId1;
  }
  if (evaluatorId2) {
    options.where.evaluatorId2 = evaluatorId2;
  }
  if (areaId) {
    options.where.areaId = areaId;
  }
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

  const { count, rows } = await JobModel.findAndCountAll(options);
  const cantPages = calcTotalPages(count);

  if (rows) {
    res.status(200).json({ pages: cantPages, response: rows });
  } else {
    res.status(500).json({ msg: "La instancia no existe." });
  }
};
