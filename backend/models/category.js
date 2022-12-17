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
      // define association here
    }
  }
  Category.init(
    {
      label: DataTypes.STRING,
      category: DataTypes.STRING,
      amount: DataTypes.FLOAT,
      parentId: DataTypes.INTEGER,
      color: DataTypes.STRING,
      colorIntensity: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Category",
    }
  );
  Category.belongsTo(Category, {foreignKey: "parentId", as: "parent"});
  return Category;
};
