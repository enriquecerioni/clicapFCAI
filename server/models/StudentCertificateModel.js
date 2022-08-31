const { DataTypes } = require("sequelize");
const db = require('../database/database');
const UserModel = require("./UserModel");

const StudentCertificateModel = db.define("studentcertificate", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    unique: true,
    autoIncrement: true,
    allowNull: false,
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
StudentCertificateModel.belongsTo(UserModel, {foreignKey: 'authorId'});
UserModel.hasMany(StudentCertificateModel, {
  foreignKey: "authorId",
});

module.exports = StudentCertificateModel;