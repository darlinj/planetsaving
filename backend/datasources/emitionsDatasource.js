const {DataSource} = require("apollo-datasource");
const {Category, Emition} = require("../models");

class EmitionsDatasource extends DataSource {
  constructor() {
    super();
  }
  async initialize(config) {}

  async clearEmitions() {
    Emition.destroy({
      truncate: true,
    });
  }

  async addEmition(args) {
    return await Emition.create(args);
  }
}

module.exports = EmitionsDatasource;
