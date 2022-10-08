const AWS = require("aws-sdk");
AWS.config.update({region: "eu-west-2"});
var docClient = new AWS.DynamoDB.DocumentClient({apiVersion: "2012-08-10"});
const tableName = process.env.TABLE_NAME;

const deleteItem = async (id, label) => {
  var params = {
    TableName: tableName,
    Key: {
      id,
      label,
    },
  };

  await docClient.delete(params).promise();
};

const putItem = async (item) => {
  var params = {
    TableName: tableName,
    Item: item,
  };

  await docClient.put(params).promise();
};

const emptyTable = async () => {
  const data = await docClient
    .scan({TableName: tableName, ConsistentRead: true})
    .promise();
  await data.Items.forEach(async (row) => {
    await deleteItem(row.id, row.label);
  });
  await new Promise((r) => setTimeout(r, 2000));
};

const uploadTestData = async (testData) => {
  testData.forEach(async (testRow) => {
    await putItem(testRow);
  });
  await new Promise((r) => setTimeout(r, 2000));
};

module.exports = {emptyTable, uploadTestData};
