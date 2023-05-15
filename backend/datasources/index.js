const ClimateData = require("./climateDatasource");
const Actions = require("./actionsDatasource");
const Emissions = require("./emissionsDatasource");
const Users = require("./usersDatasource");
const Category = require("./categoryDatasource");

const dataSources = () => ({
  climateData: new ClimateData(),
  actions: new Actions(),
  emissions: new Emissions(),
  users: new Users(),
  category: new Category(),
});
module.exports = dataSources;
