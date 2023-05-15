"use strict";
const {Model} = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Category.belongsTo(models.Category, {
        foreignKey: "parentId",
        as: "parent",
      });
      Category.hasMany(models.Category, {
        foreignKey: "parentId",
        as: "children",
      });
      Category.hasMany(models.Emission, {
        as: "emissions",
        foreignKey: "categoryId",
      });
    }
  }
  Category.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      label: DataTypes.STRING,
      category: DataTypes.STRING,
      parentId: DataTypes.INTEGER,
      color: DataTypes.STRING,
      colorIntensity: DataTypes.INTEGER,
      description: DataTypes.STRING,
      detailed_description: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Category",
    }
  );
  return Category;
};
