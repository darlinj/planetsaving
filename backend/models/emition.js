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
      Emition.belongsTo(models.Category, {as: "category"});
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
        type: Sequelize.STRING,
      },
      totalCarbonEmited: {
        type: Sequelize.FLOAT,
      },
      calculationType: {
        type: Sequelize.STRING,
      },
      categoryId: {
        type: Sequelize.INTEGER,
      },
    },
    {
      sequelize,
      modelName: "Emition",
    }
  );
  return Emition;
};
