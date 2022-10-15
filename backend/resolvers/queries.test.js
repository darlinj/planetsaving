import {getClimateData, getActions} from "./queries";

describe("Query resolvers", () => {
  test("should get climate change data from the database", () => {
    const context = {
      dataSources: {
        dynamodb: {
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
        dynamodb: {
          getActions: () => {
            return [{id: 123}, {id: 321}];
          },
        },
      },
    };
    const data = getActions(null, {}, context, null);
    expect(data.length).toBe(2);
  });
});
