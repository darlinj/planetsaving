const {DataSource} = require("apollo-datasource");
const {ClimateData, Action} = require("../models");

class Database extends DataSource {
  constructor() {
    super();
  }
  async initialize(config) {}

  async getClimateData(args) {
    return ClimateData.findAll();
  }

  async getActions() {
    return Action.findAll();
  }

  async clearClimateData() {
    ClimateData.destroy({
      truncate: true,
    });
  }

  async clearActions() {
    Action.destroy({
      truncate: true,
    });
  }

  async addAction(args) {
    await Action.create(args);
  }

  async addClimateChangeData(args) {
    await ClimateData.create(args);
  }
}

module.exports = Database;
