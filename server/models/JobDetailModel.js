const { DataTypes } = require("sequelize");
const db = require("../database/database");
const CorrectionModel = require("./CorrectionModel");
const JobModel = require("./JobModel");

const JobDetailModel = db.define("jobdetail", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    unique: true,
    autoIncrement: true,
    allowNull: false,
  },
  jobId: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  correctionId: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  details: {
    allowNull: false,
    type: DataTypes.TEXT,
  },
  date: {
    allowNull: false,
    type: DataTypes.DATEONLY,
    defaultValue: db.fn("now"),
  },
});

// JOBDETAIL - JOB
JobDetailModel.belongsTo(JobModel, { foreignKey: "jobId" });
JobModel.hasMany(JobDetailModel, {
  foreignKey: "jobId",
});

// JOBDETAIL - CORRECTION
JobDetailModel.belongsTo(CorrectionModel, { foreignKey: "correctionId" });
CorrectionModel.hasMany(JobDetailModel, {
  foreignKey: "correctionId",
});

module.exports = JobDetailModel;
