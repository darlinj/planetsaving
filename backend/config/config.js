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
    username: "db_user",
    host: process.env.DB_HOST,
    dialect: "postgres",
    dialectOptions: {
      ssl: {ca: rdsCa},
    },
  },
  production: {
    database: "footprint_production",
    username: "db_user",
    host: process.env.DB_HOST,
    dialect: "postgres",
    dialectOptions: {
      ssl: {ca: rdsCa},
    },
  },
};
