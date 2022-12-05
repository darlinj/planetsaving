const {ApolloServer} = require("apollo-server");
const serverOptions = require("../server_options");
const server = new ApolloServer(serverOptions);
const {faker} = require("@faker-js/faker");

const addClimateChangeData = async (params) => {
  await server.executeOperation({
    query: `mutation { 
        addClimateChangeData(
          label: "${params.label ? params.label : faker.lorem.word}",
          category: "${params.category ? params.category : faker.lorem.word}",
          amount: ${
            params.amount
              ? params.amount
              : faker.datatype.number({max: 10, precision: 0.1})
          }
          )
       {
        id
        label
       }
      }`,
  });
};

describe("the climateChange API", () => {
  beforeEach(async () => {
    await server.executeOperation({
      query: "mutation { clearClimateData }",
    });
    await new Promise((r) => setTimeout(r, 1000));
  });
  test("It returns the expected data", async () => {
    addClimateChangeData({label: "Food"});
    addClimateChangeData({});
    const result = await server.executeOperation({
      query: "query { getClimateData { id label category amount} }",
    });

    expect(result.data.getClimateData.length).toEqual(2);
    expect(result.data.getClimateData[0].label).toEqual("Food");
  });
});
