const { DataTypes } = require("sequelize");
const db = require('../database/database');
const UserModel = require("./UserModel");

const RegularCertificateModel = db.define("regularcertificate", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    unique: true,
    autoIncrement: true,
    allowNull: false,
  },
  detail: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  urlFile: {
    type: DataTypes.STRING,
    allowNull: false
  },
  authorId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
});

// REGULAR CERTIFICATE - AUTHOR
RegularCertificateModel.belongsTo(UserModel, {foreignKey: 'authorId'});
UserModel.hasMany(RegularCertificateModel, {
  foreignKey: "authorId",
});

module.exports = RegularCertificateModel;