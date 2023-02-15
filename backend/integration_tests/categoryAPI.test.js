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
            color: "${args.color ? args.color : faker.color.human()}"
            colorIntensity: ${args.colorIntensity ? args.colorIntensity : 666}
            parentId: ${args.parentId ? args.parentId : null}
            description: "${
              args.description ? args.description : "Some words of description"
            }"
            detailed_description: "${
              args.detailed_description
                ? args.detailed_description
                : "Some more words of description"
            }"
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
});
