const PayModel = require("../models/PayModel");
const multer = require("multer");
const path = require("path");
const Sequelize = require("sequelize");
const UserModel = require("../models/UserModel");
const { log } = require("console");
const { PAGE_LIMIT } = process.env;

// Multer Config Pay
const storage = multer.diskStorage({
  destination: path.join(__dirname, "../public/payments"),
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const createPayment = multer({
  storage,
  limits: { fileSize: 1000000 },
}).single("urlFile");

// Multer Config Invoice
const storageInvoice = multer.diskStorage({
  destination: path.join(__dirname, "../public/invoices"),
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const createInvoice = multer({
  storage: storageInvoice,
  limits: { fileSize: 1000000 },
}).single("invoice");

exports.create = async (req, res) => {
  createPayment(req, res, async (err) => {
    if (err) {
      err.message = "The file is so heavy for my service";
      return res.send(err);
    }
    const {
      amount,
      moneyType,
      payType,
      cuitCuil,
      iva,
      detail,
      urlFile,
      authorId,
    } = req.body;
    const pay = await PayModel.create({
      amount: amount,
      moneyType: moneyType,
      payType: payType,
      cuitCuil: cuitCuil,
      iva: iva,
      detail: detail,
      urlFile: req.file.filename,
      authorId: authorId,
    });
    if (pay) {
      res.status(200).json({msg:"Pago creado!"});
    } else {
      res.status(500).json({ msg: "Error al crear el pago." });
    }
  });
};

exports.updateInvoice = async (req, res) => {
  createInvoice(req, res, async (err) => {
    if (err) {
      err.message = "The file is so heavy for my service";
      return res.send(err);
    }
    const { id } = req.params;
    const pay = await PayModel.update(
      {
        invoice: req.file.filename
      },
      { where: { id: id } }
    );
    if (pay) {
      res.status(200).json({msg:"Pago facturado correctamente!"});
    } else {
      res.status(500).json({ msg: "Error al generar la factura!" });
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
//   const pay = await PayModel.create({
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
    amount,
    moneyType,
    payType,
    cuitCuil,
    iva,
    detail,
    urlFile,
    authorId,
  } = req.body;

  const pay = await PayModel.update(
    {
      amount: amount,
      moneyType: moneyType,
      payType: payType,
      cuitCuil: cuitCuil,
      iva: iva,
      detail: detail,
      urlFile: urlFile,
      authorId: authorId,
    },
    { where: { id: id } }
  );
  if (pay) {
    res.status(200).json("Pago editado!");
  } else {
    res.status(500).json({ msg: "El pago no existe!" });
  }
};
exports.getById = async (req, res) => {
  const { id } = req.params;
  const pay = await PayModel.findByPk(id);

  if (pay) {
    res.status(200).json({ response: pay });
  } else {
    res.status(500).json({ msg: "Error al obtener el pago." });
  }
};
exports.getAll = async (req, res) => {
  const pay = await PayModel.findAll();
  if (pay) {
    res.status(200).json({ response: pay });
  } else {
    res.status(500).json({ msg: "Error al obtener los pagos." });
  }
};
exports.deleteById = async (req, res) => {
  const { id } = req.params;
  const pay = await PayModel.destroy({
    where: { id: id },
  });

  if (pay) {
    res.status(200).send("Pago eliminado!");
  } else {
    res.status(500).json({ msg: "Error al eliminar el pago." });
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

  const { count, rows } = await PayModel.findAndCountAll(options);
  const cantPages = calcTotalPages(count);

  if (rows) {
    res.status(200).json({ pages: cantPages, response: rows });
  } else {
    res.status(500).json({ msg: "La instancia no existe." });
  }
};