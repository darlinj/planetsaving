"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("Categories", "colorIntensity", {
      type: Sequelize.INTEGER,
    });
    await queryInterface.addColumn("Categories", "color", {
      type: Sequelize.STRING,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("Categories", "colorIntensity");
    await queryInterface.removeColumn("Categories", "color");
  },
};
