const {ApolloServer} = require("apollo-server");
const serverOptions = require("../server_options");

const server = new ApolloServer(serverOptions);

describe("the actions API", () => {
  beforeEach(async () => {
    await server.executeOperation({
      query: "mutation { clearActions }",
    });
    await new Promise((r) => setTimeout(r, 1000));
    const result = await server.executeOperation({
      query: `mutation { 
        addClimateChangeData(
            label: "Energy", 
            category: "energy", 
        ) {
            id
          }
      }`,
    });
    const categoryId = result.data.addClimateChangeData.id;
    await server.executeOperation({
      query: `mutation { 
        addAction(
          title: "Buy an electric car",
          cost: 30000,
          carbonSaved: 1.0,
          categoryId: ${categoryId},
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
          categoryId: ${categoryId},
       ){
        id
        title
       }
      }`,
    });
  });
  test("It returns the actions list", async () => {
    const result = await server.executeOperation({
      query: "query { getActionsList { id title cost carbonSaved } }",
    });

    expect(result.data.getActionsList.length).toEqual(2);
    expect(result.data.getActionsList.map((action) => action.title)).toContain(
      "Reduce your thermostat by one degree"
    );
  });

  test("It returns the category of the action", async () => {
    const result = await server.executeOperation({
      query:
        "query { getActionsList { id title cost carbonSaved category{ label }} }",
    });
    expect(
      result.data.getActionsList.map((action) => action.category.label)
    ).toContain("Energy");
  });
});
