"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.removeColumn("Users", "numberOfPeopleInHome");
    await queryInterface.addColumn("Users", "numberOfPeopleInHome", {
      type: Sequelize.FLOAT,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.addColumn("Users", "numberOfPeopleInHome", {
      type: Sequelize.INTEGER,
    });
    await queryInterface.removeColumn("Users", "numberOfPeopleInHome");
  },
};
