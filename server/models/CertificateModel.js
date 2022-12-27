const { DataTypes } = require("sequelize");
const db = require("../database/database");

const CertificateModel = db.define("certificate", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    unique: true,
    autoIncrement: true,
    allowNull: false,
  },
  type: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  jobtext: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  introtext: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  text: {
    type: DataTypes.STRING(512),
    allowNull: false,
  },
});

module.exports = CertificateModel;
