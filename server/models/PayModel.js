const { DataTypes } = require("sequelize");
const db = require('../database/database');
const UserModel = require("./UserModel");

const PayModel = db.define("pay", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    unique: true,
    autoIncrement: true,
    allowNull: false,
  },
  amount: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  moneyType: {
    type: DataTypes.STRING,
    allowNull: false
  },
  payType: {
    type: DataTypes.STRING,
    allowNull: false
  },
  cuitCuil: {
    type: DataTypes.STRING,
    allowNull: false
  },
  iva: {
    type: DataTypes.STRING,
    allowNull: false
  },
  detail: {
    type: DataTypes.STRING,
  },
  urlFile: {
    type: DataTypes.STRING,
    allowNull: false
  },
  authorId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
});

// PAY - AUTHOR
PayModel.belongsTo(UserModel, {foreignKey: 'authorId'});
UserModel.hasMany(PayModel, {
  foreignKey: "authorId",
});

module.exports = PayModel;