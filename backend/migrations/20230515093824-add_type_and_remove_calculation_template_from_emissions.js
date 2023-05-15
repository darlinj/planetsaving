"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.removeColumn("Emissions", "calculationTemplate");
    await queryInterface.addColumn("Emissions", "calculationIdentifier", {
      type: Sequelize.STRING,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.addColumn("Emissions", "calculationTemplate", {
      type: Sequelize.STRING,
    });
    await queryInterface.removeColumn("Emissions", "calculationIdentifier");
  },
};
