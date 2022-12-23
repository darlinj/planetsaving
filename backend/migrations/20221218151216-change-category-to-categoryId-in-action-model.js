"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.removeColumn("Actions", "category");
    await queryInterface.addColumn("Actions", "categoryId", {
      type: Sequelize.INTEGER,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.addColumn("Actions", "category", {
      type: Sequelize.STRING,
    });
    await queryInterface.removeColumn("Actions", "categoryId");
  },
};
