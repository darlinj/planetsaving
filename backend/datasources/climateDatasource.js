const {DataSource} = require("apollo-datasource");
const {Category, Emition} = require("../models");
const {result} = require("lodash");

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
        order: [["colorIntensity", "ASC"]],
      });
    }

    return Category.findAll({
      where: {
        parentId: null,
      },
    });
  }

  async getCategoryWithChildrenAndEmitions(id) {
    const category = await Category.findByPk(id, {
      include: [
        {
          model: Category,
          as: "children",
          include: [{model: Emition, as: "emitions"}],
        },
        {model: Emition, as: "emitions"},
      ],
    });
    return category;
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
