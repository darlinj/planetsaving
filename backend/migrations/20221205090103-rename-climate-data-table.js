"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    queryInterface.renameTable("ClimateData", "Categories");
  },

  async down(queryInterface, Sequelize) {
    queryInterface.renameTable("Categories", "ClimateData");
  },
};
