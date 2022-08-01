const { DataTypes } = require("sequelize");
const db = require('../database/database');
const AreaModel = require("./AreaModel");
const UserModel = require("./UserModel");

const JobModel = db.define("Job", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    unique: true,
    autoIncrement: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  areaId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  authorId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  members: {
    type: DataTypes.STRING,
  },
  urlFile: {
    type: DataTypes.STRING,
    allowNull: false
  },
  evaluatorId1: {
    allowNull: true,
    type: DataTypes.INTEGER,
  },
  evaluatorId2: {
    allowNull: true,
    type: DataTypes.INTEGER,
  },
});

// JOB - AREA
JobModel.belongsTo(AreaModel, {foreignKey: 'areaId'});
AreaModel.hasMany(JobModel, {
  foreignKey: "areaId",
});

// JOB - AUTHOR
JobModel.belongsTo(UserModel, {foreignKey: 'authorId'});
UserModel.hasMany(JobModel, {
  foreignKey: "authorId",
});

// JOB - EVALUADOR 1
JobModel.belongsTo(UserModel, {foreignKey: 'evaluatorId1'});
UserModel.hasMany(JobModel, {
  foreignKey: "evaluatorId1",
});

// JOB - EVALUADOR 2
JobModel.belongsTo(UserModel, {foreignKey: 'evaluatorId2'});
UserModel.hasMany(JobModel, {
  foreignKey: "evaluatorId2",
});

module.exports = JobModel;