"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("Users", "flyingHoursPerYear", {
      type: Sequelize.FLOAT,
    });
    await queryInterface.removeColumn("Users", "flyingMilesPerYear");
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.addColumn("Users", "flyingMilesPerYear", {
      type: Sequelize.INTEGER,
    });
    await queryInterface.removeColumn("Users", "flyingHoursPerYear");
  },
};
