const {ApolloServer} = require("apollo-server");
const {DbUtils} = require("../utils/db_utils");
const serverOptions = require("../server_options");
const server = new ApolloServer(serverOptions);
import {actionsTableName} from "../tablenames";
const dbUtils = new DbUtils(actionsTableName);

describe("the actions API", () => {
  beforeEach(async () => {
    await dbUtils.emptyTable();
  });
  test("It returns the expected data", async () => {
    const action1 = {
      id: 124,
      actionTitle: "Buy an electric car",
      cost: 30000,
      carbonSaved: 1.0,
      actionType: "transport",
    };
    const action2 = {
      id: 123,
      actionTitle: "Reduce your thermostat by one degree",
      cost: 0,
      carbonSaved: 0.3,
      actionType: "energy",
    };
    await dbUtils.uploadTestData([action1, action2]);
    const result = await server.executeOperation({
      query:
        "query { getActions { id actionTitle cost carbonSaved actionType} }",
    });

    expect(result.data.getActions.length).toEqual(2);
    expect(result.data.getActions[0]).toEqual(action1);
  });
});
