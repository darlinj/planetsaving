"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("ClimateData", "category", {
      type: Sequelize.STRING,
    });
    await queryInterface.removeColumn("ClimateData", "color");
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.addColumn("ClimateData", "color", {
      type: Sequelize.STRING,
    });
    await queryInterface.removeColumn("ClimateData", "category");
  },
};
