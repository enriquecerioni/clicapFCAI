const { DataTypes } = require("sequelize");
const db = require('../database/database');

const NewModel = db.define("new", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    unique: true,
    autoIncrement: true,
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  content: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  urlFile: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = NewModel