import {getClimateData, getDBData} from "./queries";

describe("Query resolvers", () => {
  test("should get data from the database", () => {
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
});
