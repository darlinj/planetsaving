"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "ClimateData",
      [
        {
          label: "Transport",
          category: "transport",
          amount: 2.4,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          label: "Things you buy",
          category: "purchasing",
          amount: 3.2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          label: "Schools and hospitals",
          category: "government",
          amount: 1.1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          label: "Energy",
          category: "energy",
          amount: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          label: "Food",
          category: "food",
          amount: 1.9,
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
