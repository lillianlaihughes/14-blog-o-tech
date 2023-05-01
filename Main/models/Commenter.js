// follows same format for Writer
// LILLIAN TO DO: should Writer and Commenter be one entity? A user can do both, so...
const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

class Commenter extends Model {
  checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.password);
  }
}

Commenter.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [8],
        isAlphanumeric: true,
      },
    },
  },
  {
    hooks: {
      // hash pw before creating new user
      beforeCreate: async (newCommenterData) => {
        newCommenterData.password = await bcrypt.hash(
          newCommenterData.password,
          10
        );
        return newCommenterData;
      },
      // hash pw before updating user
      beforeUpdate: async (updatedCommenterData) => {
        updatedCommenterData.password = await bcrypt.hash(
          updatedCommenterData.password,
          10
        );
        return updatedCommenterData;
      },
    },
  },
  {
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: 'commenter',
  }
);

module.exports = Commenter;
