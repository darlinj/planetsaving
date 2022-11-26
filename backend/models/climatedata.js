'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ClimateData extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ClimateData.init({
    id: DataTypes.FLOAT,
    label: DataTypes.STRING,
    color: DataTypes.STRING,
    amount: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'ClimateData',
  });
  return ClimateData;
};