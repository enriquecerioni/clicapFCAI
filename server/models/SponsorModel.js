const { DataTypes } = require("sequelize");
const db = require("../database/database");

const SponsorModel = db.define("sponsor", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    unique: true,
    autoIncrement: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  link: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  urlFile: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  imgbase64: {
    type: DataTypes.TEXT("long"),
    allowNull: false,
  },
});

module.exports = SponsorModel;
