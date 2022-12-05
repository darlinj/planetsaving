const {DataSource} = require("apollo-datasource");
const {Category} = require("../models");

class ClimateDatasource extends DataSource {
  constructor() {
    super();
  }
  async initialize(config) {}

  async getClimateData(args) {
    return Category.findAll();
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
