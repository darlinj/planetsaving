const Dynamodb = require("./dynamodb");

const dataSources = () => ({
  dynamodb: new Dynamodb(),
});
module.exports = dataSources;
