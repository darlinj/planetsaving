const {DataSource} = require("apollo-datasource");
const {Category, Emition} = require("../models");

class ClimateDatasource extends DataSource {
  constructor() {
    super();
  }
  async initialize(config) {}

  async getClimateData(args) {
    if (args?.parentCategory) {
      return Category.findAll({
        include: [
          {
            model: Category,
            required: true,
            as: "parent",
            where: {
              category: args.parentCategory,
            },
          },
        ],
      });
    }

    return Category.findAll({
      where: {
        parentId: null,
      },
    });
  }

  async getAmount(parentId) {
    const result = await Emition.findAll({
      attributes: [
        [
          Emition.sequelize.fn(
            "sum",
            Emition.sequelize.col("totalCarbonEmited")
          ),
          "amount",
        ],
      ],
      group: ["categoryId"],
      where: {
        categoryId: parentId,
      },
      raw: true,
    });
    const amount = result[0] ? result[0].amount : null;
    return amount;
  }

  async getSubCategories(parentId) {
    return Category.findAll({
      where: {
        parentId: parentId,
      },
    });
  }

  async clearClimateData() {
    Category.destroy({
      truncate: true,
    });
  }

  async addClimateChangeData(args) {
    return await Category.create(args);
  }
}

module.exports = ClimateDatasource;
