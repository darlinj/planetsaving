"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.removeColumn("Categories", "detailed_description");
    await queryInterface.removeColumn("Categories", "description");
    await queryInterface.addColumn("Categories", "description", {
      type: Sequelize.TEXT,
    });
    await queryInterface.addColumn("Categories", "detailed_description", {
      type: Sequelize.TEXT,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("Categories", "detailed_description");
    await queryInterface.removeColumn("Categories", "description");
    await queryInterface.addColumn("Categories", "description", {
      type: Sequelize.STRING,
    });
    await queryInterface.addColumn("Categories", "detailed_description", {
      type: Sequelize.STRING,
    });
  },
};
