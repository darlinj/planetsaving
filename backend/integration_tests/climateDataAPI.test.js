const {ApolloServer} = require("apollo-server");
const serverOptions = require("../server_options");
const server = new ApolloServer(serverOptions);

describe("the climateChange API", () => {
  beforeEach(async () => {
    await server.executeOperation({
      query: "mutation { clearClimateData }",
    });
    await new Promise((r) => setTimeout(r, 1000));
  });
  test("It returns the expected data", async () => {
    await server.executeOperation({
      query: `mutation { 
        addClimateChangeData(
          id: 123,
          label: "Food",
          color: "Red",
          amount: 10,
       )
       {
        id
        label
       }
      }`,
    });
    await server.executeOperation({
      query: `mutation { 
        addClimateChangeData(
          id: 124,
          label: "consumables",
          color: "Green",
          amount: 20,
       )
       {
        id
        label
       }
      }`,
    });
    const result = await server.executeOperation({
      query: "query { getClimateData { id label color amount} }",
    });

    expect(result.data.getClimateData.length).toEqual(2);
    expect(result.data.getClimateData[0].label).toEqual("Food");
  });
});
