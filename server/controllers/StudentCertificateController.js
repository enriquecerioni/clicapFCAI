const CertificateModel = require("../models/CertificateModel");
const JobModel = require("../models/JobModel");
const StudentCertificateModel = require("../models/StudentCertificateModel");
const UserModel = require("../models/UserModel");

exports.create = async (req, res) => {
  try {
    const { certificateId, userId } = req.body;
    let { jobId } = req.body;

    if (jobId === "") {
      jobId = null;
    }

    console.log(certificateId, userId, jobId);
    const certificate = await StudentCertificateModel.create({
      certificateId,
      userId,
      jobId,
    });
    if (certificate) {
      res.status(200).json({ msg: "Certificado creado!" });
    } else {
      res.status(500).json({ msg: "Error al crear el certificado." });
    }
  } catch (error) {
    console.log("Error al crear el certificado.");
  }
};

exports.updateById = async (req, res) => {
  try {
    const { id } = req.params;
    const { certificateId, userId } = req.body;
    let { jobId } = req.body;

    if (jobId === "") {
      jobId = null;
    }

    const certificate = await StudentCertificateModel.update(
      {
        certificateId,
        userId,
        jobId,
      },
      { where: { id: id } }
    );
    if (certificate) {
      res.status(200).json("Certificado editado!");
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
    const certificate = await StudentCertificateModel.findByPk(id);

    if (certificate) {
      res.status(200).json({ response: certificate });
    } else {
      res.status(500).json({ msg: "Error al obtener el certificado." });
    }
  } catch (error) {
    console.log("Error al obtener el certificado." + error);
  }
};

exports.getAll = async (req, res) => {
  try {
    const certificate = await StudentCertificateModel.findAll();
    if (certificate) {
      res.status(200).json({ response: certificate });
    } else {
      res.status(500).json({ msg: "Error al obtener los certificados." });
    }
  } catch (error) {
    console.log("Error al obtener los certificados." + error);
  }
};

exports.getAllByUser = async (req, res) => {
  try {
    const { userId } = req.params;
    console.log(userId);
    let options = {
      where: { userId: userId },
      include: [
        { model: JobModel, include: [{ model: UserModel, as: "user" }] },
        { model: CertificateModel },
      ],
    };
    const certificate = await StudentCertificateModel.findAll(options);
    if (certificate) {
      res.status(200).json({ response: certificate });
    } else {
      res.status(500).json({ msg: "Error al obtener los certificados." });
    }
  } catch (error) {
    console.log("Error al obtener los certificados." + error);
  }
};

exports.deleteById = async (req, res) => {
  try {
    const { id } = req.params;
    const cerificate = await StudentCertificateModel.destroy({
      where: { id: id },
    });

    if (cerificate) {
      res.status(200).send("Certificado eliminado!");
    } else {
      res.status(500).json({ msg: "Error al eliminar el certificado." });
    }
  } catch (error) {
    console.log("Error al eliminar el certificado." + error);
  }
};
