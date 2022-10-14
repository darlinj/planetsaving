const {ApolloServer} = require("apollo-server");
const {DbUtils} = require("../utils/db_utils");
const serverOptions = require("../server_options");
const server = new ApolloServer(serverOptions);
import {climateDataTableName} from "../tablenames";
const dbUtils = new DbUtils(climateDataTableName);

describe("the climateChange API", () => {
  beforeEach(async () => {
    await dbUtils.emptyTable();
  });
  test("It returns the expected data", async () => {
    const climateCategory1 = {
      id: 123,
      label: "Food",
      color: "Red",
      amount: 10,
    };
    const climateCategory2 = {
      id: 124,
      label: "consumables",
      color: "Green",
      amount: 20,
    };
    await dbUtils.uploadTestData([climateCategory1, climateCategory2]);
    const result = await server.executeOperation({
      query: "query { getClimateData { id label color amount} }",
    });

    expect(result.data.getClimateData.length).toEqual(2);
    expect(result.data.getClimateData[0]).toEqual(climateCategory1);
  });
});
