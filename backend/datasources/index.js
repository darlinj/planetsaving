const ClimateData = require("./climateDatasource");
const Actions = require("./actionsDatasource");

const dataSources = () => ({
  climateData: new ClimateData(),
  actions: new Actions(),
});
module.exports = dataSources;
