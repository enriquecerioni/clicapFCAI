const { DataTypes } = require("sequelize");
const db = require('../database/database');
const AreaModel = require("./AreaModel");
const UserModel = require("./UserModel");

const DocumentModel = db.define("document", {
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

// DOCUMENT - AREA
DocumentModel.belongsTo(AreaModel, {foreignKey: 'areaId'});
AreaModel.hasMany(DocumentModel, {
  foreignKey: "areaId",
});

// DOCUMENT - AUTHOR
DocumentModel.belongsTo(UserModel, {foreignKey: 'authorId'});
UserModel.hasMany(DocumentModel, {
  foreignKey: "authorId",
});

// DOCUMENT - EVALUADOR 1
DocumentModel.belongsTo(UserModel, {foreignKey: 'evaluatorId1'});
UserModel.hasMany(DocumentModel, {
  foreignKey: "evaluatorId1",
});

// DOCUMENT - EVALUADOR 2
DocumentModel.belongsTo(UserModel, {foreignKey: 'evaluatorId2'});
UserModel.hasMany(DocumentModel, {
  foreignKey: "evaluatorId2",
});

module.exports = DocumentModel;