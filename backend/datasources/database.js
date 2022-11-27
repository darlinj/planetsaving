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
}

module.exports = Database;
