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
    Category.create(args)
      .then((item) => {
        return item;
      })
      .catch((error) => {
        console.log(`FAILED to write climate change data for ${args}`);
      });
  }
}

module.exports = ClimateDatasource;
