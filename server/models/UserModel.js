const { DataTypes } = require("sequelize");
const db = require('../database/database');
const RoleModel = require("./RoleModel");

const UserModel = db.define("user", {
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
  surname: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  roleId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  identifyType: {
    type: DataTypes.STRING,
    allowNull: false
  },
  identifyNumber: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false
  },
  institution: {
    type: DataTypes.STRING,
    allowNull: false
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

// DOCUMENT - AUTHOR
UserModel.belongsTo(RoleModel, {foreignKey: 'roleId'});
RoleModel.hasMany(UserModel, {
  foreignKey: "roleId",
});

module.exports = UserModel;