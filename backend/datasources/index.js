const ClimateData = require("./climateDatasource");
const Actions = require("./actionsDatasource");
const Emitions = require("./emitionsDatasource");

const dataSources = () => ({
  climateData: new ClimateData(),
  actions: new Actions(),
  emitions: new Emitions(),
});
module.exports = dataSources;
