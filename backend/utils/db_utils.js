const AWS = require("aws-sdk");
AWS.config.update({region: "eu-west-2"});
var docClient = new AWS.DynamoDB.DocumentClient({apiVersion: "2012-08-10"});

class DbUtils {
  constructor(tableName) {
    this.tableName = tableName;
  }
  deleteItem = async (id) => {
    var params = {
      TableName: this.tableName,
      Key: {
        id,
      },
    };

    await docClient.delete(params).promise();
  };

  putItem = async (item) => {
    var params = {
      TableName: this.tableName,
      Item: item,
    };

    await docClient.put(params).promise();
  };

  emptyTable = async () => {
    const data = await docClient
      .scan({TableName: this.tableName, ConsistentRead: true})
      .promise();
    await data.Items.forEach(async (row) => {
      await this.deleteItem(row.id);
    });
    await new Promise((r) => setTimeout(r, 2000));
  };

  uploadTestData = async (testData) => {
    testData.forEach(async (testRow) => {
      await this.putItem(testRow);
    });
    await new Promise((r) => setTimeout(r, 2000));
  };
}

module.exports = {DbUtils};
