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
          title: "Buy an electric car",
          cost: 30000,
          carbonSaved: 1.0,
          category: "transport",
       ) {
        id
        title
       }
      }`,
    });
    await server.executeOperation({
      query: `mutation { 
        addAction(
          title: "Reduce your thermostat by one degree",
          cost: 0,
          carbonSaved: 0.3,
          category: "energy",
       ){
        id
        title
       }
      }`,
    });
    const result = await server.executeOperation({
      query: "query { getActionsList { id title cost carbonSaved category} }",
    });

    expect(result.data.getActionsList.length).toEqual(2);
    expect(result.data.getActionsList.map((action) => action.title)).toContain(
      "Reduce your thermostat by one degree"
    );
  });
});
