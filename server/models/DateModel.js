const { DataTypes } = require("sequelize");
const db = require('../database/database');

const DateModel = db.define("date", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    unique: true,
    autoIncrement: true,
    allowNull: false,
  },
  date: {
    type: DataTypes.STRING,
    defaultValue: '2022-11-12'
  },
});

module.exports = DateModel;