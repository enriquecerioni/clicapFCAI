const { DataTypes } = require("sequelize");
const db = require('../database/database');

const ImportantDateModel = db.define("importantDate", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    unique: true,
    autoIncrement: true,
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
});

module.exports = ImportantDateModel;