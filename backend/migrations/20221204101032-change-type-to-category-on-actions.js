"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("Actions", "category", {type: "string"});
    await queryInterface.removeColumn("Actions", "type");
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.addColumn("Actions", "type", {type: "string"});
    await queryInterface.removeColumn("Actions", "category");
  },
};
