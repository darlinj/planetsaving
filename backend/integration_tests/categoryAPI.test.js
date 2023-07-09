const {ApolloServer} = require("apollo-server");
const serverOptions = require("../server_options");
const server = new ApolloServer(serverOptions);
const {faker} = require("@faker-js/faker");
const {addClimateChangeData, addUser, addEmission} = require("./testUtils");

describe("the category API", () => {
  beforeEach(async () => {
    await server.executeOperation({
      query: "mutation { clearClimateData }",
    });
    await server.executeOperation({
      query: "mutation { clearEmissions }",
    });
    await new Promise((r) => setTimeout(r, 1000));
  });

  test("It returns the expected category data", async () => {
    await addClimateChangeData({
      category: "flying",
      label: "Flying",
      color: "red",
      colorIntensity: 500,
      description: "Some description",
      detailed_description: "Some more description",
    });
    await addClimateChangeData();
    const result = await server.executeOperation({
      query: `query GetCategoryData {
        getCategoryData(category: "flying") {
          category
          color
          colorIntensity
          label
          description
          detailed_description
        }
      }
      `,
    });

    expect(result.data.getCategoryData.label).toEqual("Flying");
    expect(result.data.getCategoryData.color).toEqual("red");
    expect(result.data.getCategoryData.colorIntensity).toEqual(500);
    expect(result.data.getCategoryData.category).toEqual("flying");
    expect(result.data.getCategoryData.description).toEqual("Some description");
    expect(result.data.getCategoryData.detailed_description).toEqual(
      "Some more description"
    );
  });

  test("It returns the sub category data", async () => {
    const parentId = await addClimateChangeData({
      category: "findme",
      label: "Food",
    });
    await addClimateChangeData({parentId, label: "Sub Food"});
    await addClimateChangeData({parentId, label: "Sub Drink"});
    await addClimateChangeData();
    const result = await server.executeOperation({
      query: `query GetCategoryData {
        getCategoryData(category: "findme") {
          category
          children {
            label
          }
        }
      }
      `,
    });

    expect(
      result.data.getCategoryData.children.map((sub) => sub.label)
    ).toContain("Sub Food");
    expect(
      result.data.getCategoryData.children.map((sub) => sub.label)
    ).toContain("Sub Drink");
  });

  test("It returns the amount of carbon for the category", async () => {
    const userId = await addUser({userValueToMultiply: 10});
    const categoryId = await addClimateChangeData({
      category: "findme",
      label: "Test",
    });
    addEmission({
      categoryId,
      calculationIdentifier: "simple_multiplier_by_2",
    });
    const result = await server.executeOperation({
      query: `query GetCategoryData {
        getCategoryData(category: "findme") {
          category
          amount(userId: ${userId})
        }
      }
      `,
    });

    expect(result.data.getCategoryData.amount).toEqual(20);
  });

  test("getting the text based calculation & references", async () => {
    const userId = await addUser({userValueToMultiply: 10});
    const categoryId = await addClimateChangeData({
      category: "findme",
      label: "Test",
    });
    addEmission({
      categoryId,
      calculationIdentifier: "simple_multiplier_by_2",
    });
    const result = await server.executeOperation({
      query: `query GetCategoryData {
        getCategoryData(category: "findme") {
          category
          calculation(userId: ${userId})
          referenceUrls {
            url
            label
          }
        }
      }
      `,
    });

    expect(result.data.getCategoryData.calculation).toEqual(
      "It multiplies by 2 Obvs!"
    );

    expect(result.data.getCategoryData.referenceUrls[0].url).toEqual(
      "http://emample.com"
    );
  });
});
