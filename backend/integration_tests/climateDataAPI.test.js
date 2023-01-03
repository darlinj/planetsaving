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

const addEmition = async (args = {}) => {
  const result = await server.executeOperation({
    query: `mutation { 
        addEmition(
            name: "${args.name ? args.name : faker.lorem.word()}",
            totalCarbonEmited: ${
              args.totalCarbonEmited
                ? args.totalCarbonEmited
                : faker.datatype.number({max: 10, precision: 0.1})
            },

            calculationType: "Fixed"
            categoryId: ${args.categoryId ? args.categoryId : null}
       )
       {
        id
        name
       }
      }`,
  });
  return result.data.addEmition.id;
};

describe("the climateChange API", () => {
  beforeEach(async () => {
    await server.executeOperation({
      query: "mutation { clearClimateData }",
    });
    await server.executeOperation({
      query: "mutation { clearEmitions }",
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

  test("Returns the nested categories if supplied", async () => {
    const foodId = await addClimateChangeData({label: "Food"});
    addClimateChangeData({parentId: foodId, label: "Sub Food"});
    const result = await server.executeOperation({
      query: `query {
        getClimateData
          {
            id
            label
            subCategories
            {
              id
              label
            }
          }
        }`,
    });

    expect(result.data.getClimateData.length).toEqual(1);
    expect(result.data.getClimateData[0].label).toEqual("Food");
    expect(result.data.getClimateData[0].subCategories[0].label).toEqual(
      "Sub Food"
    );
  });

  test("Returns the nested categories if the category is provided as a parameter", async () => {
    const foodId = await addClimateChangeData({
      label: "Food",
      category: "Food",
    });
    addClimateChangeData({parentId: foodId, label: "Sub Food"});
    const result = await server.executeOperation({
      query: `query {
        getClimateData(parentCategory: "Food")
          {
            id
            label
            subCategories
            {
              id
              label
            }
          }
        }`,
    });

    expect(result.data.getClimateData.length).toEqual(1);
    expect(result.data.getClimateData[0].label).toEqual("Sub Food");
  });

  test("It adds up the emitions for the category correctly", async () => {
    const topCat = await addClimateChangeData();
    const subCat1 = await addClimateChangeData();
    const subCat2 = await addClimateChangeData();
    addEmition({categoryId: subCat1, totalCarbonEmited: 1});
    addEmition({categoryId: subCat1, totalCarbonEmited: 1});
    addEmition({categoryId: subCat2, totalCarbonEmited: 1});
    addEmition({categoryId: subCat2, totalCarbonEmited: 1});
    const result = await server.executeOperation({
      query: `query {
            getClimateData
              {
                id
                amount
                subCategories
                {
                  id
                  amount
                }
              }
            }`,
    });

    expect(result.data.getClimateData[0].amount).toEqual(4);
    expect(result.data.getClimateData[0].subCategories[0].amount).toEqual(2);
  });
});
