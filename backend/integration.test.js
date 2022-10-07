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

describe("the climateChange API", () => {
  beforeEach(async () => {
    await emptyTable();
  });
  test("It returns the expected data", async () => {
    const climateCategory1 = {
      id: 123,
      label: "Food",
      color: "Red",
      amount: 10,
    };
    const climateCategory2 = {
      id: 124,
      label: "consumables",
      color: "Green",
      amount: 20,
    };
    await uploadTestData([climateCategory1, climateCategory2]);
    const result = await server.executeOperation({
      query: "query { getClimateData { id label color amount} }",
    });

    expect(result.data.getClimateData.length).toEqual(2);
    expect(result.data.getClimateData[0]).toEqual(climateCategory1);
  });
});
