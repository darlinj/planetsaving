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
