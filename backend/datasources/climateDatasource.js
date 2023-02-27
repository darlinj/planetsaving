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

  async getCategoryChildren(id) {
    const category = await Category.findByPk(id, {
      include: ["children"],
    });
    return category.children;
  }

  async getCategoryChildrenWithEmitions(id) {
    const category = await Category.findByPk(id, {
      include: [
        {
          model: Category,
          as: "children",
          include: [{model: Emition, as: "emitions"}],
        },
      ],
    });
    return category.children;
  }

  async sumEmitionsForChildCategories(id) {
    const result = await Category.findByPk(id, {
      include: [
        {
          model: Category,
          as: "children",
          include: [{model: Emition, as: "emitions"}],
        },
      ],
    });
    const amount = result.children.reduce(
      (total, c) => total + this.calculateEmitionsTotal(c.emitions),
      0
    );
    return amount;
  }

  calculateEmitionsTotal(emitions) {
    return emitions.reduce((subtotal, emition) => {
      const template = (tpl, args) =>
        tpl.replace(/\${(\w+)}/g, (_, v) => args[v]);
      const calculation_template = "${totalCarbonEmited}*1.0";
      console.log({...emition.dataValues});
      const calculation = template(calculation_template, {
        totalCarbonEmited: emition.totalCarbonEmited,
      });
      return subtotal + eval(calculation);
    }, 0);
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
