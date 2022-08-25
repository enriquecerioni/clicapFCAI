const { DataTypes } = require("sequelize");
const db = require("../database/database");
const AreaModel = require("./AreaModel");
const JobModalityModel = require("./JobModalityModel");
const UserModel = require("./UserModel");

const JobModel = db.define("job", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    unique: true,
    autoIncrement: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  areaId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  authorId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: UserModel,
      key: "id",
    },
  },
  members: {
    type: DataTypes.STRING,
  },
  jobModalityId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  urlFile: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  evaluatorId1: {
    allowNull: true,
    type: DataTypes.INTEGER,
    references: {
      model: UserModel,
      key: "id",
    },
  },
  evaluatorId2: {
    allowNull: true,
    type: DataTypes.INTEGER,
    references: {
      model: UserModel,
      key: "id",
    },
  },
});

// JOB - AREA
JobModel.belongsTo(AreaModel, { foreignKey: "areaId" });
AreaModel.hasMany(JobModel, {
  foreignKey: "areaId",
});

// JOB - AUTHOR
JobModel.belongsTo(UserModel, { foreignKey: "authorId", as: "author" });
UserModel.hasMany(JobModel, {
  foreignKey: "authorId",
});

// JOB - JOB MODALITY
JobModel.belongsTo(JobModalityModel, { foreignKey: "jobModalityId" });
JobModalityModel.hasOne(JobModel, {
  foreignKey: "jobModalityId",
});

// JOB - EVALUADOR 1
JobModel.belongsTo(UserModel, { foreignKey: "evaluatorId1", as: "evaluator1" });
UserModel.hasMany(JobModel, {
  foreignKey: "evaluatorId1",
});

// JOB - EVALUADOR 2
JobModel.belongsTo(UserModel, { foreignKey: "evaluatorId2", as: "evaluator2" });
UserModel.hasMany(JobModel, {
  foreignKey: "evaluatorId2",
});

module.exports = JobModel;
