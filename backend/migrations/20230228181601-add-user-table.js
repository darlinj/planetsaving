"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Users", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
      },
      numberOfPeopleInHome: {
        type: Sequelize.INTEGER,
      },
      unitsOfElectricityUsedPerYear: {
        type: Sequelize.INTEGER,
      },
      unitsOfGasUsedPerYear: {
        type: Sequelize.INTEGER,
      },
      drivingMilesPerYear: {
        type: Sequelize.INTEGER,
      },
      flyingMilesPerYear: {
        type: Sequelize.INTEGER,
      },
      trainMilesPerYear: {
        type: Sequelize.INTEGER,
      },
      carType: {
        type: Sequelize.STRING,
      },
      greenEnergyTarriff: {
        type: Sequelize.BOOLEAN,
      },
      amountOfLocalFood: {
        type: Sequelize.STRING,
      },
      amountOfOrganicFood: {
        type: Sequelize.STRING,
      },
      percentageOfFoodWaste: {
        type: Sequelize.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Users");
  },
};
