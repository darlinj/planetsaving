const ClimateData = require("./climateDatasource");
const Actions = require("./actionsDatasource");
const Emitions = require("./emitionsDatasource");
const Category = require("./categoryDatasource");

const dataSources = () => ({
  climateData: new ClimateData(),
  actions: new Actions(),
  emitions: new Emitions(),
  category: new Category(),
});
module.exports = dataSources;
