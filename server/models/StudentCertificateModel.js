const { DataTypes } = require("sequelize");
const db = require("../database/database");
const CertificateModel = require("./CertificateModel");
const UserModel = require("./UserModel");

const StudentCertificateModel = db.define("studentcertificate", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    unique: true,
    autoIncrement: true,
    allowNull: false,
  },
  certificateId: {
    type: DataTypes.INTEGER,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

// STUDENTCERTIFICATE - CERTIFICATE
StudentCertificateModel.belongsTo(CertificateModel, { foreignKey: "certificateId" });
CertificateModel.hasMany(StudentCertificateModel, {
  foreignKey: "certificateId",
});
// STUDENTCERTIFICATE - USER
StudentCertificateModel.belongsTo(UserModel, { foreignKey: "userId" });
UserModel.hasMany(StudentCertificateModel, {
  foreignKey: "userId",
});

module.exports = StudentCertificateModel;
