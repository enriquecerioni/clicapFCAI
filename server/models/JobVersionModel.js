const { DataTypes } = require("sequelize");
const db = require("../database/database");
const JobModel = require("./JobModel");

const JobVersionModel = db.define("jobversion", {
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
    references: {
      model: JobModel,
      key: "id",
    },
  },
  versionNumber: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  status: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  feedback: {
    allowNull: true,
    type: DataTypes.TEXT,
  },
  urlFile: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  correctionDate: {
    allowNull: true,
    type: DataTypes.DATEONLY,
  },
});

// JOBVERSION - JOB
JobVersionModel.belongsTo(JobModel, { foreignKey: "jobId" });
JobModel.hasMany(JobVersionModel, {
  foreignKey: "jobId",
});

module.exports = JobVersionModel;