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
  deadlineDays: {
    type: DataTypes.INTEGER,
    defaultValue: 30
  },
});

module.exports = DateModel;