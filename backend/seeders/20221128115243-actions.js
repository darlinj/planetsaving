"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const categories = await queryInterface.sequelize.query(
      `select id, category from "Categories";`
    );
    const categoryLookupId = (categoryToFind) => {
      const foundCategory = categories[0].filter((category) => {
        return category.category == categoryToFind;
      });
      return foundCategory[0].id;
    };

    await queryInterface.bulkInsert(
      "Actions",
      [
        {
          title: "Buy an electric car",
          cost: 30000,
          carbonSaved: 1.2,
          categoryId: categoryLookupId("car"),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Take 1 fewer airplane trips",
          cost: 0,
          carbonSaved: 0.5,
          categoryId: categoryLookupId("air"),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Seek out brands with low carbon footprint",
          cost: 0,
          carbonSaved: 0.5,
          categoryId: categoryLookupId("appliances"),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Buy second hand clothes",
          cost: 0,
          carbonSaved: 0.2,
          categoryId: categoryLookupId("clothes"),
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
