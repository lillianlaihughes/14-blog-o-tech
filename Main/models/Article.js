const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Article extends Model {}

Article.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
    },
    date_created: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
      writer_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'writer',
          key: 'id',
      },
    },
    },
   {
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: "writer",
  }
);

module.exports = Article;
