const { DataTypes } = require("sequelize");
const db = require('../database/database');

const CorrectionModel = db.define("correction", {
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
});

module.exports = CorrectionModel;