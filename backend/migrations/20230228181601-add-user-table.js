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
      kwhOfElectricityUsedPerYear: {
        type: Sequelize.INTEGER,
      },
      kwhOfGasUsedPerYear: {
        type: Sequelize.INTEGER,
      },
      drivingMilesPerYear: {
        type: Sequelize.INTEGER,
      },
      sizeOfCar: {
        type: Sequelize.STRING,
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
