const { DataTypes } = require("sequelize");
const db = require("../database/database");
const AreaModel = require("./AreaModel");
const JobModalityModel = require("./JobModalityModel");
const UserModel = require("./UserModel");
const CorrectionModel = require("./CorrectionModel");

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
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: UserModel,
      key: "id",
    },
  },
  status: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  author: {
    type: DataTypes.STRING,
  },
  members: {
    type: DataTypes.STRING,
  },
  jobModalityId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  approve: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  correctionNumber: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1,
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
// JOB - CORRECTION(ESTADO)
JobModel.belongsTo(CorrectionModel, { foreignKey: "status", as: "jobStatus" });
CorrectionModel.hasMany(JobModel, {
  foreignKey: "status",
});

// JOB - USER (persona que sube el trabajo, puede ser el autor o no)
JobModel.belongsTo(UserModel, { foreignKey: "userId", as: "user" });
UserModel.hasMany(JobModel, {
  foreignKey: "userId",
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
