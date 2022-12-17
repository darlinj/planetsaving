"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Categories",
      [
        {
          label: "Transport",
          category: "transport",
          amount: 2.4,
          color: "orange",
          colorIntensity: "500",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          label: "Things you buy",
          category: "purchasing",
          amount: 3.2,
          color: "red",
          colorIntensity: "500",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          label: "Schools and hospitals",
          category: "government",
          amount: 1.1,
          color: "green",
          colorIntensity: "500",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          label: "Energy",
          category: "energy",
          amount: 2,
          color: "yellow",
          colorIntensity: "500",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          label: "Food",
          category: "food",
          amount: 1.9,
          color: "blue",
          colorIntensity: "500",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );

    // import transport categories
    const transportCategory = await queryInterface.sequelize.query(
      `select id from "Categories" where category='transport';`
    );
    await queryInterface.bulkInsert(
      "Categories",
      [
        {
          label: "car",
          category: "car",
          amount: 1.4,
          color: "orange",
          colorIntensity: "700",
          parentId: transportCategory[0][0].id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          label: "train",
          category: "train",
          amount: 0.4,
          color: "orange",
          colorIntensity: "500",
          parentId: transportCategory[0][0].id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          label: "air",
          category: "air",
          amount: 0.6,
          color: "orange",
          colorIntensity: "300",
          parentId: transportCategory[0][0].id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );

    // import purchasing categories
    const purchasingCategory = await queryInterface.sequelize.query(
      `select id from "Categories" where category='purchasing';`
    );
    await queryInterface.bulkInsert(
      "Categories",
      [
        {
          label: "Home Appliances",
          category: "appliances",
          amount: 1.4,
          color: "red",
          colorIntensity: "700",
          parentId: purchasingCategory[0][0].id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          label: "Electronics",
          category: "electronics",
          amount: 0.4,
          color: "red",
          colorIntensity: "500",
          parentId: purchasingCategory[0][0].id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          label: "Cloths",
          category: "cloths",
          amount: 0.6,
          color: "red",
          colorIntensity: "300",
          parentId: purchasingCategory[0][0].id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Categories", null, {});
  },
};
