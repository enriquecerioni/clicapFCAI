const PayModel = require("../models/PayModel");
const multer = require("multer");
const path = require("path");
const Sequelize = require("sequelize");
const UserModel = require("../models/UserModel");
const { log } = require("console");
const { PAGE_LIMIT } = process.env;
const { calcNumOffset, calcTotalPages } = require("../helpers/helpers");
const uuid = require("uuid");
const { response } = require("express");
const excelJS = require("exceljs");
const EXCEL_CELL_WIDTH = 12;
var jobUUID;

// Multer Config Pay
const storage = multer.diskStorage({
  destination: path.join(__dirname, "../public/payments"),
  filename: (req, file, cb) => {
    jobUUID = uuid.v4() + path.extname(file.originalname);
    cb(null, jobUUID);
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
    jobUUID = uuid.v4() + path.extname(file.originalname);
    cb(null, jobUUID);
  },
});
const createInvoice = multer({
  storage: storageInvoice,
  limits: { fileSize: 1000000 },
}).single("invoice");

exports.create = async (req, res) => {
  try {
    createPayment(req, res, async (err) => {
      if (err) {
        err.message = "The file is so heavy for my service";
        return res.send(err);
      }
      const { amount, moneyType, payType, cuitCuil, iva, detail, authorId } =
        req.body;
      const pay = await PayModel.create({
        amount: amount,
        moneyType: moneyType,
        payType: payType,
        cuitCuil: cuitCuil,
        iva: iva,
        detail: detail,
        urlFile: jobUUID,
        authorId: authorId,
      });
      if (pay) {
        res.status(200).json({ msg: "Pago creado!" });
      } else {
        res.status(500).json({ msg: "Error al crear el pago." });
      }
    });
  } catch (error) {
    console.log("Error al crear el pago." + error);
  }
};

exports.updateInvoice = async (req, res) => {
  try {
    createInvoice(req, res, async (err) => {
      if (err) {
        err.message = "The file is so heavy for my service";
        return res.send(err);
      }
      const { id } = req.params;
      const pay = await PayModel.update(
        {
          invoice: jobUUID,
        },
        { where: { id: id } }
      );
      if (pay) {
        res.status(200).json({ msg: "Pago facturado correctamente!" });
      } else {
        res.status(500).json({ msg: "Error al generar la factura!" });
      }
    });
  } catch (error) {
    console.log("Error al generar la factura!" + error);
  }
};

exports.updateById = async (req, res) => {
  try {
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
  } catch (error) {
    console.log("El pago no existe!" + error);
  }
};

exports.getById = async (req, res) => {
  try {
    const { id } = req.params;
    const pay = await PayModel.findByPk(id);

    if (pay) {
      res.status(200).json({ response: pay });
    } else {
      res.status(500).json({ msg: "Error al obtener el pago." });
    }
  } catch (error) {
    console.log("Error al obtener el pago." + error);
  }
};

exports.getByAuthorId = async (req, res) => {
  try {
    const { authorId } = req.params;
    console.log(req.params);
    const pay = await PayModel.findOne({
      where: { authorId },
    });

    if (pay) {
      res.status(200).json({ response: pay });
    } else {
      res.status(500).json({ msg: "Error al obtener el pago del autor." });
    }
  } catch (error) {
    console.log("Error al obtener el pago del autor." + error);
  }
};

exports.getAll = async (req, res) => {
  try {
    const pay = await PayModel.findAll();
    if (pay) {
      res.status(200).json({ response: pay });
    } else {
      res.status(500).json({ msg: "Error al obtener los pagos." });
    }
  } catch (error) {
    console.log("Error al obtener los pagos." + error);
  }
};

exports.deleteById = async (req, res) => {
  try {
    const { id } = req.params;
    const pay = await PayModel.destroy({
      where: { id: id },
    });

    if (pay) {
      res.status(200).send("Pago eliminado!");
    } else {
      res.status(500).json({ msg: "Error al eliminar el pago." });
    }
  } catch (error) {
    console.log("Error al eliminar el pago." + error);
  }
};

exports.getAllPaginated = async (req, res) => {
  try {
    const { authorId, name, surname, areaId } = req.query;
    console.log(req.query);
    const { page } = req.params;

    const offsetIns = calcNumOffset(page);
    let options = {
      where: {},
      include: [{ model: UserModel }],
      offset: offsetIns,
      limit: Number(PAGE_LIMIT),
    };

    if (authorId) {
      options.where.authorId = authorId;
    }

    const { count, rows } = await PayModel.findAndCountAll(options);
    const cantPages = calcTotalPages(count);

    if (rows) {
      res.status(200).json({ pages: cantPages, response: rows });
    } else {
      res.status(500).json({ msg: "La instancia no existe." });
    }
  } catch (error) {
    console.log("La instancia no existe.");
  }
};
exports.getAllPaginatedWithFilter = async (req, res) => {
  try {
    const { authorId } = req.query;
    console.log(req.query);
    const { page } = req.params;
    const offsetIns = calcNumOffset(page);
    let options = {
      where: {},
      /*       include: [{ model: RoleModel }], */
      offset: offsetIns,
      limit: Number(PAGE_LIMIT),
    };

    if (authorId) {
      options.where.authorId = authorId;
    }

    const { count, rows } = await PayModel.findAndCountAll(options);
    const cantPages = calcTotalPages(count);

    if (rows) {
      res.status(200).json({ pages: cantPages, response: rows });
    } else {
      res.status(500).json({ msg: "Los pagos no existen." });
    }
  } catch (error) {
    console.log("Los pagos no existen." + error);
  }
};
//Export in excel
const optionsToFilter = (req) => {
  try {
    const { authorId } = req.query;
    console.log(req.query);
    let options = {
      where: {},
      include: [{ model: UserModel }],
    };

    if (authorId) {
      options.where.authorId = Number(authorId);
    }

    return options;
  } catch (e) {
    console.log(e);
    return res.status(503).json({ msg: "Fallo en el servidor" });
  }
};
exports.downloadFilter = async (req, res) => {
  const options = optionsToFilter(req);
  const rows = await PayModel.findAll(options);
  const workbook = new excelJS.Workbook(); // Create a new workbook
  const worksheet = workbook.addWorksheet("Pagos"); // New Worksheet
  // Column for data in excel. key must match data key
  worksheet.columns = [
    { header: "Autor", key: "name", width: EXCEL_CELL_WIDTH },
    { header: "Cuil/Cuit", key: "cuitCuil", width: EXCEL_CELL_WIDTH },
    {
      header: "Condición Frente al IVA",
      key: "iva",
      width: EXCEL_CELL_WIDTH,
    },
    { header: "Monto", key: "amount", width: EXCEL_CELL_WIDTH },
    { header: "Modo de Pago", key: "payType", width: EXCEL_CELL_WIDTH },
    { header: "Detalle", key: "detail", width: EXCEL_CELL_WIDTH },
  ];
  // Looping through User data
  rows.forEach((pay) => {
    pay.name = pay.user.name + " " + pay.user.surname;
    worksheet.addRow(pay); // Add data in worksheet
  });
  // put styles
  worksheet.getRow(1).eachCell((cell) => {
    (cell.font = { bold: true }),
      (cell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: {
          argb: "8BF5FA",
        },
        bgColor: {
          argb: "FF000000",
        },
      }),
      (cell.border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      });
  });
  worksheet.getRow(1).eachCell((cell) => {
    (cell.font = { bold: true }),
      (cell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: {
          argb: "8BF5FA",
        },
        bgColor: {
          argb: "FF000000",
        },
      }),
      (cell.border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      });
  });
  rows.forEach((element, i) => {
    worksheet.getRow(i + 2).eachCell((cell) => {
      cell.border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };
    });
  });
  //header to download
  res.setHeader(
    "Content-Type",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  );
  res.setHeader("Content-Disposition", "attachment; filename=pagos.xlsx");
  try {
    return await workbook.xlsx.write(res).then(() => {
      res.status(200).end();
    });
  } catch (err) {
    res.send("Error al descargar");
  }
};
