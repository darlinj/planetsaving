const {DataSource} = require("apollo-datasource");
const AWS = require("aws-sdk");

const dynamo = new AWS.DynamoDB.DocumentClient({region: "eu-west-2"});

const tableName = process.env.TABLE_NAME;

class Dynamodb extends DataSource {
  constructor() {
    super();
  }
  initialize(config) {}

  async getClimateData(args) {
    const data = await dynamo
      .scan({TableName: tableName, ConsistentRead: true})
      .promise();
    return data.Items;
  }
}

module.exports = Dynamodb;
