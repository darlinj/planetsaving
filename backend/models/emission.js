"use strict";
const {Model} = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Emission extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Emission.belongsTo(models.Category, {
        as: "category",
        foreignKey: "categoryId",
      });
    }
  }
  Emission.init(
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
      calculationIdentifier: {
        type: DataTypes.STRING,
      },
      categoryId: {
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: "Emission",
    }
  );
  return Emission;
};
