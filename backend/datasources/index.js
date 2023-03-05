const ClimateData = require("./climateDatasource");
const Actions = require("./actionsDatasource");
const Emitions = require("./emitionsDatasource");
const Users = require("./usersDatasource");
const Category = require("./categoryDatasource");

const dataSources = () => ({
  climateData: new ClimateData(),
  actions: new Actions(),
  emitions: new Emitions(),
  users: new Users(),
  category: new Category(),
});
module.exports = dataSources;
