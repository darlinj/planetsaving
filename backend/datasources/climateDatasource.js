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
      });
    }

    return Category.findAll({
      where: {
        parentId: null,
      },
    });
  }

  async getAmount(id) {
    const category = await Category.findByPk(id, {
      include: ["children"],
    });
    if (category.children.length == 0) {
      return this.sumEmitionsForCategory(id);
    } else {
      return this.sumEmitionsForChildCategories(id);
    }
  }

  async sumEmitionsForChildCategories(id) {
    const result = await Category.findByPk(id, {
      raw: true,
      attributes: {
        include: [
          [
            Category.sequelize.fn(
              "sum",
              Category.sequelize.col("children.emitions.totalCarbonEmited")
            ),
            "amount",
          ],
        ],
      },
      include: [
        {
          model: Category,
          as: "children",
          include: [{model: Emition, as: "emitions"}],
        },
      ],
    });
    const amount = result ? result.amount : null;
    return amount;
  }

  async sumEmitionsForCategory(id) {
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
        categoryId: id,
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
