const {DataSource} = require("apollo-datasource");
const {Category} = require("../models");

class CategoryDatasource extends DataSource {
  constructor() {
    super();
  }
  async initialize(config) {}

  async getCategoryData(args) {
    return Category.findOne({
      include: [
        {
          model: Category,
          as: "children",
        },
      ],
      where: {
        category: args.category,
      },
    });
  }
}

module.exports = CategoryDatasource;
