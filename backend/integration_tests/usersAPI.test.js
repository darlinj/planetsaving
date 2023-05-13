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
          kwhOfElectricityUsedPerYear: 4800
          kwhOfGasUsedPerYear: 18000
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
          kwhOfElectricityUsedPerYear: 4800
          kwhOfGasUsedPerYear: 18000
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
        }
      }`,
    });
    expect(result.data.getUser.name).toEqual("TEST USER");
  });

  test("returns the default user if no user ID is provided", async () => {
    await server.executeOperation({
      query: `mutation {
        addUser(
          name: "AVERAGE JOE"
          numberOfPeopleInHome: 2.4
          kwhOfElectricityUsedPerYear: 4800
          kwhOfGasUsedPerYear: 18000
          drivingMilesPerYear: 8000
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
    testUserID = null;
    const result = await server.executeOperation({
      query: `query {
        getUser( id: ${testUserID}
        ) {
          name
        }
      }`,
    });
    expect(result.data.getUser.name).toEqual("AVERAGE JOE");
  });

  test("Add or update user", async () => {
    testUserID = 999;
    const updateResult = await server.executeOperation({
      query: `
      mutation addOrUpdateUser($id: Int!, $user: UserInput) {
        addOrUpdateUser(id: $id, user: $user) {
          id
          name
        }
      }`,
      variables: {
        id: testUserID,
        user: {
          id: testUserID,
          name: "SPECIAL JOE",
          numberOfPeopleInHome: 2.4,
          kwhOfElectricityUsedPerYear: 4800,
          kwhOfGasUsedPerYear: 18000,
          drivingMilesPerYear: 90000,
          sizeOfCar: "medium",
          flyingMilesPerYear: 500,
          trainMilesPerYear: 300,
          carType: "electric",
          greenEnergyTarriff: true,
          amountOfLocalFood: "average",
          amountOfOrganicFood: "average",
          percentageOfFoodWaste: 41,
        },
      },
    });
    const result = await server.executeOperation({
      query: `query {
        getUser( id: ${testUserID}
        ) {
          name
        }
      }`,
    });
    expect(result.data.getUser.name).toEqual("SPECIAL JOE");
  });
});
