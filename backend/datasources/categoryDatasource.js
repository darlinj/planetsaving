const {DataSource} = require("apollo-datasource");
const {Category} = require("../models");

class CategoryDatasource extends DataSource {
  constructor() {
    super();
  }
  async initialize(config) {}

  async getCategoryData(args) {
    return Category.findOne({
      where: {
        category: args.category,
      },
    });
  }
}

module.exports = CategoryDatasource;
