"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.removeColumn("Actions", "category");
    await queryInterface.addColumn("Actions", "CategoryId", {
      type: Sequelize.INTEGER,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.addColumn("Actions", "category", {
      type: Sequelize.STRING,
    });
    await queryInterface.removeColumn("Actions", "CategoryId");
  },
};
