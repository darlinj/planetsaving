import {getClimateData, getActionsList} from "./queries";

describe("Query resolvers", () => {
  test("should get climate change data from the database", () => {
    const context = {
      dataSources: {
        climateData: {
          getClimateData: () => {
            return [{id: 123}, {id: 321}];
          },
        },
      },
    };
    const data = getClimateData(null, {}, context, null);
    expect(data.length).toBe(2);
  });

  test("should get the actions from the database", () => {
    const context = {
      dataSources: {
        actions: {
          getActions: () => {
            return [{id: 123}, {id: 321}];
          },
        },
      },
    };
    const data = getActionsList(null, {}, context, null);
    expect(data.length).toBe(2);
  });
});
