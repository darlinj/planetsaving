"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const transportCategory = await queryInterface.sequelize.query(
      `select id from "Categories" where category='transport';`
    );
    await queryInterface.bulkInsert(
      "Actions",
      [
        {
          title: "Do a thihng",
          cost: 3.2,
          carbonSaved: 4.5,
          categoryId: transportCategory[0][0].id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Do another thihng",
          cost: 3.2,
          carbonSaved: 4.5,
          categoryId: transportCategory[0][0].id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Actions", null, {});
  },
};
