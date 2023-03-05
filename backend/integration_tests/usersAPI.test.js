const {ApolloServer} = require("apollo-server");
const serverOptions = require("../server_options");

const server = new ApolloServer(serverOptions);

let testUserID = "";

describe("the users API", () => {
  beforeEach(async () => {
    const result = await server.executeOperation({
      query: `mutation {
        addUser(
          name: "TEST USER"
          numberOfPeopleInHome: 2.4
          unitsOfElectricityUsedPerYear: 4800
          unitsOfGasUsedPerYear: 18000
          drivingMilesPerYear: 9000
          flyingMilesPerYear: 500
          trainMilesPerYear: 300
          carType: "ICE"
          greenEnergyTarriff: true
          amountOfLocalFood: "average"
          amountOfOrganicFood: "average"
          percentageOfFoodWaste: 41
        ) {
          id
          name
        }
      }`,
    });
    testUserID = result.data.addUser.id;
  });

  test("It is possible to create a user", async () => {
    const result = await server.executeOperation({
      query: `mutation {
        addUser(
          name: "AVERAGE JOE"
          numberOfPeopleInHome: 2.4
          unitsOfElectricityUsedPerYear: 4800
          unitsOfGasUsedPerYear: 18000
          drivingMilesPerYear: 9000
          flyingMilesPerYear: 500
          trainMilesPerYear: 300
          carType: "ICE"
          greenEnergyTarriff: true
          amountOfLocalFood: "average"
          amountOfOrganicFood: "average"
          percentageOfFoodWaste: 41
        ) {
          id
          name
        }
      }`,
    });
    expect(result.data.addUser.name).toEqual("AVERAGE JOE");
  });

  test("getting a user by ID", async () => {
    const result = await server.executeOperation({
      query: `query {
        getUser( id: ${testUserID}
        ) {
          name
          numberOfPeopleInHome
          unitsOfElectricityUsedPerYear
          unitsOfGasUsedPerYear
          drivingMilesPerYear
          flyingMilesPerYear
          trainMilesPerYear
          carType
          greenEnergyTarriff
          amountOfLocalFood
          amountOfOrganicFood
          percentageOfFoodWaste
        }
      }`,
    });
    console.log(result);
    expect(result.data.getUser.name).toEqual("TEST USER");
  });
  //   test("It returns the user based on ID", async () => {
  //     const result = await server.executeOperation({
  //       query: "query { getUser(id: 1234) { id title cost carbonSaved } }",
  //     });

  //     expect(result.data.getActionsList.length).toEqual(2);
  //     expect(result.data.getActionsList.map((action) => action.title)).toContain(
  //       "Reduce your thermostat by one degree"
  //     );
  //   });

  //   test("It returns the category of the action", async () => {
  //     const result = await server.executeOperation({
  //       query:
  //         "query { getActionsList { id title cost carbonSaved category{ label }} }",
  //     });
  //     expect(
  //       result.data.getActionsList.map((action) => action.category.label)
  //     ).toContain("Energy");
  //   });
});
