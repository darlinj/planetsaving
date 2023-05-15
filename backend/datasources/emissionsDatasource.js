const {DataSource} = require("apollo-datasource");
const {Category, Emission} = require("../models");

class EmissionsDatasource extends DataSource {
  constructor() {
    super();
  }
  async initialize(config) {}

  async clearEmissions() {
    Emission.destroy({
      truncate: true,
    });
  }

  async addEmission(args) {
    return await Emission.create(args);
  }
}

module.exports = EmissionsDatasource;
