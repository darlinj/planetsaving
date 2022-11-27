const {DataSource} = require("apollo-datasource");
const {ClimateData} = require("../models");

class Database extends DataSource {
  constructor() {
    super();
  }
  async initialize(config) {}

  async getClimateData(args) {
    return ClimateData.findAll();
  }

  async clearClimateData() {
    ClimateData.destroy({
      truncate: true,
    });
  }

  async addClimateChangeData(args) {
    await ClimateData.create(args);
  }
}

module.exports = Database;
