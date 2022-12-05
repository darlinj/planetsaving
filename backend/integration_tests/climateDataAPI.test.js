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
            amount: ${
              args.amount
                ? args.amount
                : faker.datatype.number({max: 10, precision: 0.1})
            },
            parentId: ${args.parentId ? args.parentId : null}
          )
       {
        id
        label
       }
      }`,
  });
  console.log(result);
  return result.data.addClimateChangeData.id;
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
    addClimateChangeData();
    const result = await server.executeOperation({
      query: "query { getClimateData { id label category amount} }",
    });

    expect(result.data.getClimateData.length).toEqual(2);
    expect(result.data.getClimateData[0].label).toEqual("Food");
  });

  test("it sets the parent ID if supplied", async () => {
    const foodId = await addClimateChangeData({label: "Food"});
    addClimateChangeData();
    addClimateChangeData({parentId: foodId, label: "Sub Food"});
    const result = await server.executeOperation({
      query: `query {
        getClimateData
          {
            id
            label
            category
            amount
            parentId
          }
        }`,
    });

    expect(result.data.getClimateData[2].parentId).toEqual(foodId);
  });

  // test("it sets the parent ID if supplied", async () => {
  //   const foodId = await addClimateChangeData({label: "Food"});
  //   addClimateChangeData();
  //   addClimateChangeData({parentId: foodId, label: "Sub Food"});
  //   const result = await server.executeOperation({
  //     query: `query {
  //       getClimateData
  //         {
  //           id
  //           label
  //           category
  //           amount
  //           parentId
  //         }
  //       }`,
  //   });

  //   expect(result.data.getClimateData[2].parentId).toEqual(foodId);
  // });
});
