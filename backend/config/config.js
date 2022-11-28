require("dotenv").config();
const fs = require("fs");
const rdsCa = fs.readFileSync(__dirname + "/eu-west-2-bundle.pem");
module.exports = {
  development: {
    username: "root",
    password: null,
    database: "database_development",
    host: "127.0.0.1",
    dialect: "sqlite",
  },
  test: {
    database: "footprint_test",
    host: "footprint-test.c0u40heuqthr.eu-west-2.rds.amazonaws.com",
    dialect: "postgres",
    dialectOptions: {
      ssl: {ca: rdsCa},
    },
  },
  production: {
    username: "root",
    password: null,
    database: "database_production",
    host: "127.0.0.1",
    dialect: "mysql",
  },
};
