const { DataTypes } = require("sequelize");
const db = require('../database/database');

const AreaModel = db.define("area", {
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

module.exports = AreaModel;