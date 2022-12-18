"use strict";
const {Model} = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Action extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Action.belongsTo(models.Category, {as: "category"});
    }
  }
  Action.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      title: DataTypes.STRING,
      cost: DataTypes.FLOAT,
      categoryId: DataTypes.INTEGER,
      carbonSaved: DataTypes.FLOAT,
    },
    {
      sequelize,
      modelName: "Action",
    }
  );
  return Action;
};
