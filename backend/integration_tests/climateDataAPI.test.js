const {ApolloServer} = require("apollo-server");
const serverOptions = require("../server_options");
const server = new ApolloServer(serverOptions);
const {faker} = require("@faker-js/faker");
const {addEmission, addClimateChangeData} = require("./testUtils");

describe("the climateChange API", () => {
  beforeEach(async () => {
    await server.executeOperation({
      query: "mutation { clearClimateData }",
    });
    await server.executeOperation({
      query: "mutation { clearEmissions }",
    });
    await new Promise((r) => setTimeout(r, 1000));
  });

  test("It returns the expected data", async () => {
    addClimateChangeData({label: "Food"});
    addClimateChangeData({label: "Poo"});
    const result = await server.executeOperation({
      query: "query { getClimateData { id label category amount} }",
    });

    expect(result.data.getClimateData.length).toEqual(2);
    expect(result.data.getClimateData[1].label).toEqual("Food");
  });

  test("Returns the nested categories if supplied", async () => {
    const foodId = await addClimateChangeData({label: "Food"});
    await addClimateChangeData({parentId: foodId, label: "Sub Food"});
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
    await addClimateChangeData({parentId: foodId, label: "Sub Food"});
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

  test("It adds up the emissions for the category correctly", async () => {
    const topCat = await addClimateChangeData();
    const subCat1 = await addClimateChangeData({parentId: topCat});
    const subCat2 = await addClimateChangeData({parentId: topCat});
    addEmission({categoryId: subCat1, totalCarbonEmited: 1});
    addEmission({categoryId: subCat1, totalCarbonEmited: 1});
    addEmission({categoryId: subCat2, totalCarbonEmited: 1});
    addEmission({categoryId: subCat2, totalCarbonEmited: 1});
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

    expect(result.data.getClimateData[0].subCategories[0].amount).toEqual(2);
    expect(result.data.getClimateData[0].amount).toEqual(4);
  });
});
