const {ApolloServer} = require("apollo-server");
const serverOptions = require("../server_options");
const server = new ApolloServer(serverOptions);
const {faker} = require("@faker-js/faker");

const addClimateChangeData = async (args = {}) => {
  const result = await server.executeOperation({
    query: `mutation { 
        addClimateChangeData(
            label: "${args.label ? args.label : faker.lorem.word()}",
            category: "${
              args.category
                ? args.category
                : ["food", "government"][Math.floor(Math.random() * 2)]
            }",
            parentId: ${args.parentId ? args.parentId : null}
          )
       {
        id
        label
       }
      }`,
  });
  return result.data.addClimateChangeData.id;
};

describe("the category API", () => {
  beforeEach(async () => {
    await server.executeOperation({
      query: "mutation { clearClimateData }",
    });
    // await server.executeOperation({
    //   query: "mutation { clearEmitions }",
    // });
    await new Promise((r) => setTimeout(r, 1000));
  });

  test("It returns the expected category data", async () => {
    addClimateChangeData({label: "Flying"});
    addClimateChangeData();
    const result = await server.executeOperation({
      query: `getCategoryData(category: "Flying") {
        label
        color
        colorIntensity
      }
      `,
    });

    expect(result.data.getCategoryData.label).toEqual("Flying");
  });
});
