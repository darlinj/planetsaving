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
          color: "orange",
          colorIntensity: "500",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          label: "Things you buy",
          category: "purchasing",
          color: "red",
          colorIntensity: "500",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          label: "Schools and hospitals",
          category: "government",
          color: "green",
          colorIntensity: "500",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          label: "Energy",
          category: "energy",
          color: "yellow",
          colorIntensity: "500",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          label: "Food",
          category: "food",
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
          color: "orange",
          colorIntensity: "700",
          parentId: transportCategory[0][0].id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          label: "train",
          category: "train",
          color: "orange",
          colorIntensity: "500",
          parentId: transportCategory[0][0].id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          label: "air",
          category: "air",
          colorIntensity: "300",
          parentId: transportCategory[0][0].id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );

    // import government categories
    const govenmentCategory = await queryInterface.sequelize.query(
      `select id from "Categories" where category='government';`
    );
    await queryInterface.bulkInsert(
      "Categories",
      [
        {
          label: "Defence",
          category: "defence",
          color: "green",
          colorIntensity: "700",
          parentId: govenmentCategory[0][0].id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          label: "Hospitals",
          category: "hospitals",
          color: "green",
          colorIntensity: "500",
          parentId: govenmentCategory[0][0].id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          label: "Roads",
          category: "roads",
          color: "green",
          colorIntensity: "300",
          parentId: govenmentCategory[0][0].id,
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
          color: "red",
          colorIntensity: "700",
          parentId: purchasingCategory[0][0].id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          label: "Electronics",
          category: "electronics",
          color: "red",
          colorIntensity: "500",
          parentId: purchasingCategory[0][0].id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          label: "Clothes",
          category: "clothes",
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
