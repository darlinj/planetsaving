"use strict";
const {Model} = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {}
  }
  User.init(
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
      numberOfPeopleInHome: {
        type: DataTypes.FLOAT,
      },
      kwhOfElectricityUsedPerYear: {
        type: DataTypes.INTEGER,
      },
      gasEstimationType: {
        type: DataTypes.STRING,
      },
      electricityEstimationType: {
        type: DataTypes.STRING,
      },
      kwhOfGasUsedPerYear: {
        type: DataTypes.INTEGER,
      },
      m3OfGasUsedPerYear: {
        type: DataTypes.INTEGER,
      },
      houseSize: {
        type: DataTypes.STRING,
      },
      drivingMilesPerYear: {
        type: DataTypes.INTEGER,
      },
      sizeOfCar: {
        type: DataTypes.STRING,
      },
      flyingHoursPerYear: {
        type: DataTypes.INTEGER,
      },
      trainMilesPerYear: {
        type: DataTypes.INTEGER,
      },
      carType: {
        type: DataTypes.STRING,
      },
      greenEnergyTarriff: {
        type: DataTypes.INTEGER,
      },
      amountOfLocalFood: {
        type: DataTypes.STRING,
      },
      amountOfOrganicFood: {
        type: DataTypes.STRING,
      },
      percentageOfFoodWaste: {
        type: DataTypes.INTEGER,
      },
      userValueToMultiply: {
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
