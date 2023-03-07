"use strict";
const {Model} = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Emition extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Emition.belongsTo(models.Category, {
        as: "category",
        foreignKey: "categoryId",
      });
    }
  }
  Emition.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      name: {
        type: DataTypes.STRING,
      },
      totalCarbonEmited: {
        type: DataTypes.FLOAT,
      },
      calculationType: {
        type: DataTypes.STRING,
      },
      calculationTemplate: {
        type: DataTypes.STRING,
      },
      categoryId: {
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: "Emition",
    }
  );
  return Emition;
};
