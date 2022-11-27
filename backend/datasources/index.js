const Dynamodb = require("./dynamodb");
const Database = require("./database");

const dataSources = () => ({
  dynamodb: new Dynamodb(),
  database: new Database(),
});
module.exports = dataSources;
