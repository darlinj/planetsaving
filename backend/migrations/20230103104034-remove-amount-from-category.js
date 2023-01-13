"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.removeColumn("Categories", "amount");
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.addColumn("Categories", "amount", Sequelize.FLOAT);
  },
};
