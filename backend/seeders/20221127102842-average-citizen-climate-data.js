"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "ClimateData",
      [
        {
          label: "Transport",
          color: "blue",
          amount: 2.3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          label: "Government",
          color: "red",
          amount: 2.1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("ClimateData", null, {});
  },
};
