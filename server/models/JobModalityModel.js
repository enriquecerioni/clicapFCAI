const { DataTypes } = require("sequelize");
const db = require('../database/database');

const JobModalityModel = db.define("jobmodality", {
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
  urlFile: {
    type: DataTypes.STRING,
    allowNull: true
  },
});

module.exports = JobModalityModel;