const { DataTypes } = require("sequelize");
const db = require('../database/database');
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
    allowNull: true,
    type: DataTypes.INTEGER,
  },
  correctionId: {
    allowNull: true,
    type: DataTypes.INTEGER,
  },
  details: {
    allowNull: true,
    type: DataTypes.TEXT,
  },
});

// JOBDETAIL - JOB
JobDetailModel.belongsTo(JobModel, {foreignKey: 'jobId'});
JobModel.hasMany(JobDetailModel, {
  foreignKey: "jobId",
});

// JOBDETAIL - CORRECTION
JobDetailModel.belongsTo(CorrectionModel, {foreignKey: 'correctionId'});
CorrectionModel.hasMany(JobDetailModel, {
  foreignKey: "correctionId",
});

module.exports = JobDetailModel;