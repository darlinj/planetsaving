const {DataSource} = require("apollo-datasource");
const {Category, Action} = require("../models");

class ActionsDatasource extends DataSource {
  constructor() {
    super();
  }
  async initialize(config) {}

  async getActions(args) {
    if (args?.parentCategory) {
      return Action.findAll({
        include: [
          {
            model: Category,
            as: "category",
            required: true,
            include: [
              {
                model: Category,
                as: "parent",
                where: {
                  category: args.parentCategory,
                },
              },
            ],
          },
        ],
      });
    }
    return Action.findAll({
      include: {model: Category, as: "category"},
    });
  }

  async clearActions() {
    Action.destroy({
      truncate: true,
    });
  }

  async addAction(args) {
    return await Action.create(args);
  }
}

module.exports = ActionsDatasource;
