const { DataTypes } = require("sequelize");
const db = require('../database/database');

const PaymentModel = db.define("payment", {
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

module.exports = PaymentModel;