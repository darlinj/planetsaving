const {ApolloServer} = require("apollo-server");

const serverOptions = require("./server_options");
const AWS = require("aws-sdk");
AWS.config.update({region: "eu-west-2"});

const server = new ApolloServer(serverOptions);
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

describe("Checking what we get", () => {
  beforeEach(async () => {
    await emptyTable();
  });
  test("some test", async () => {
    await uploadTestData([
      {
        id: 123,
        label: "Food",
        color: "Red",
        amount: 10,
      },
      {
        id: 124,
        label: "Food",
        color: "Red",
        amount: 10,
      },
    ]);
    const result = await server.executeOperation({
      query: "query { getClimateData { id, label} }",
    });

    expect(result.data.getClimateData.length).toEqual(2);
  });
});
