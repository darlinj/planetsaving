"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("Users", "gasEstimationType", {
      type: Sequelize.STRING,
    });
    await queryInterface.addColumn("Users", "houseSize", {
      type: Sequelize.STRING,
    });
    await queryInterface.addColumn("Users", "m3OfGasUsedPerYear", {
      type: Sequelize.INTEGER,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("Users", "gasEstimationType");
    await queryInterface.removeColumn("Users", "houseSize");
    await queryInterface.removeColumn("Users", "m3OfGasUsedPerYear");
  },
};
