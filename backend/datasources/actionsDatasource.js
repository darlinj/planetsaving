const {DataSource} = require("apollo-datasource");
const {Action} = require("../models");

class ActionsDatasource extends DataSource {
  constructor() {
    super();
  }
  async initialize(config) {}

  async getActions() {
    return Action.findAll();
  }

  async clearActions() {
    Action.destroy({
      truncate: true,
    });
  }

  async addAction(args) {
    await Action.create(args);
  }
}

module.exports = ActionsDatasource;
