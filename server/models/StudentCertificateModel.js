const { DataTypes } = require("sequelize");
const db = require("../database/database");
const CertificateModel = require("./CertificateModel");
const UserModel = require("./UserModel");
const JobModel = require("./JobModel");

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
  jobId: {
    type: DataTypes.INTEGER,
    allowNull: true,
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
// STUDENTCERTIFICATE - JOB
StudentCertificateModel.belongsTo(JobModel, { foreignKey: "jobId" });
JobModel.hasMany(StudentCertificateModel, {
  foreignKey: "jobId",
});

module.exports = StudentCertificateModel;
