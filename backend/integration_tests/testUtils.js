const {ApolloServer} = require("apollo-server");
const serverOptions = require("../server_options");
const server = new ApolloServer(serverOptions);
const {faker} = require("@faker-js/faker");

const addEmission = async (args = {}) => {
  const result = await server.executeOperation({
    query: `mutation { 
          addEmission(
              name: "${args.name ? args.name : faker.lorem.word()}",
              totalCarbonEmited: ${
                args.totalCarbonEmited
                  ? args.totalCarbonEmited
                  : faker.datatype.number({max: 10, precision: 0.1})
              },
              calculationType: "Fixed"
              calculationIdentifier: "${
                args.calculationIdentifier ? args.calculationIdentifier : null
              }"
              categoryId: ${args.categoryId ? args.categoryId : null}
         )
         {
          id
          name
         }
        }`,
  });
  return result.data.addEmission.id;
};

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
                args.description
                  ? args.description
                  : "Some words of description"
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

const addUser = async (args = {}) => {
  const result = await server.executeOperation({
    query: `mutation { 
            addUser( user: {
                name: "${args.name ? args.name : faker.lorem.word()}",
                userValueToMultiply: ${
                  args.userValueToMultiply ? args.userValueToMultiply : 10
                }}
           )
           {
            id
            name
           }
          }`,
  });
  try {
    return result.data.addUser.id;
  } catch (error) {
    console.log("graphQL result:", result);
    console.error(error);
  }
};

module.exports = {addEmission, addUser, addClimateChangeData};
