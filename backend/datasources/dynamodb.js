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
    const data = await dynamo
      .scan({TableName: actionsTableName, ConsistentRead: true})
      .promise();
    return data.Items;
  }

  async clearActions(args) {
    let result = true;
    const data = await dynamo
      .scan({TableName: actionsTableName, ConsistentRead: true})
      .promise();
    data.Items.forEach(async (item) => {
      try {
        const params = {
          TableName: actionsTableName,
          Key: {
            id: item.id,
          },
        };
        await dynamo.delete(params).promise();
      } catch (err) {
        result = false;
      }
    });
    return result;
  }
}

module.exports = Dynamodb;
