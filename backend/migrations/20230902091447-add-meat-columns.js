"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("Users", "meatEstimationType", {
      type: Sequelize.STRING,
    });
    await queryInterface.addColumn("Users", "beefMealsPerWeek", {
      type: Sequelize.FLOAT,
    });
    await queryInterface.addColumn("Users", "beefGramsPerWeek", {
      type: Sequelize.FLOAT,
    });
    await queryInterface.addColumn("Users", "lambMealsPerWeek", {
      type: Sequelize.FLOAT,
    });
    await queryInterface.addColumn("Users", "lambGramsPerWeek", {
      type: Sequelize.FLOAT,
    });
    await queryInterface.addColumn("Users", "porkMealsPerWeek", {
      type: Sequelize.FLOAT,
    });
    await queryInterface.addColumn("Users", "porkGramsPerWeek", {
      type: Sequelize.FLOAT,
    });
    await queryInterface.addColumn("Users", "chickenMealsPerWeek", {
      type: Sequelize.FLOAT,
    });
    await queryInterface.addColumn("Users", "chickenGramsPerWeek", {
      type: Sequelize.FLOAT,
    });
    await queryInterface.addColumn("Users", "cheeseMealsPerWeek", {
      type: Sequelize.FLOAT,
    });
    await queryInterface.addColumn("Users", "cheeseGramsPerWeek", {
      type: Sequelize.FLOAT,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("Users", "userValueToMultiply");
    await queryInterface.removeColumn("Users", "meatEstimationType");
    await queryInterface.removeColumn("Users", "beefMealsPerWeek");
    await queryInterface.removeColumn("Users", "beefGramsPerWeek");
    await queryInterface.removeColumn("Users", "lambMealsPerWeek");
    await queryInterface.removeColumn("Users", "lambGramsPerWeek");
    await queryInterface.removeColumn("Users", "porkMealsPerWeek");
    await queryInterface.removeColumn("Users", "porkGramsPerWeek");
    await queryInterface.removeColumn("Users", "chickenMealsPerWeek");
    await queryInterface.removeColumn("Users", "chickenGramsPerWeek");
    await queryInterface.removeColumn("Users", "cheeseMealsPerWeek");
    await queryInterface.removeColumn("Users", "cheeseGramsPerWeek");
  },
};
