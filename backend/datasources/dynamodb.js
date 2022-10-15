const {DataSource} = require("apollo-datasource");
const AWS = require("aws-sdk");

const dynamo = new AWS.DynamoDB.DocumentClient({region: "eu-west-2"});

const {climateDataTableName, actionsTableName} = require("../tablenames");

class Dynamodb extends DataSource {
  constructor() {
    super();
  }
  initialize(config) {}

  async getClimateData(args) {
    const data = await dynamo
      .scan({TableName: climateDataTableName, ConsistentRead: true})
      .promise();
    return data.Items;
  }

  async getActions(args) {
    console.log(actionsTableName);
    const data = await dynamo
      .scan({TableName: actionsTableName, ConsistentRead: true})
      .promise();
    return data.Items;
  }
}

module.exports = Dynamodb;
