const {ApolloServer} = require("apollo-server");
const serverOptions = require("../server_options");

const server = new ApolloServer(serverOptions);

describe("the actions API", () => {
  beforeEach(async () => {
    const result = await server.executeOperation({
      query: "mutation { clearActions }",
    });
    await new Promise((r) => setTimeout(r, 1000));
  });
  test("It returns the actions list", async () => {
    await server.executeOperation({
      query: `mutation { 
        addAction(
          id: 124,
          actionTitle: "Buy an electric car",
          cost: 30000,
          carbonSaved: 1.0,
          actionType: "transport",
       )
      }`,
    });
    await server.executeOperation({
      query: `mutation { 
        addAction(
          id: 123,
          actionTitle: "Reduce your thermostat by one degree",
          cost: 0,
          carbonSaved: 0.3,
          actionType: "energy",
       )
      }`,
    });
    const result = await server.executeOperation({
      query:
        "query { getActionsList { id actionTitle cost carbonSaved actionType} }",
    });

    console.log(result);

    expect(result.data.getActionsList.length).toEqual(2);
    expect(result.data.getActionsList[0].actionTitle).toEqual(
      "Reduce your thermostat by one degree"
    );
  });
});
