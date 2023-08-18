const {Category} = require("./types");
const emissionsCalculator = require("./emissionsCalculator");

jest.mock("./emissionsCalculator");

describe("getting the amount data", () => {
  it("looks up the category and the user", async () => {
    emissionsCalculator.calculateCategoryAmount.mockReturnValue("some data");

    const mockGetCategoryWithChildrenAndEmissions = jest.fn(
      () => "some categories"
    );
    const mockGetUser = jest.fn(() => {
      return {dataValues: "user data values"};
    });
    const category = await Category.amount(
      {id: 123},
      {userId: 999},
      {
        dataSources: {
          climateData: {
            getCategoryWithChildrenAndEmissions:
              mockGetCategoryWithChildrenAndEmissions,
          },
          users: {
            getUser: mockGetUser,
            getUserByName: () => "standard user",
          },
        },
      },
      null
    );

    expect(mockGetCategoryWithChildrenAndEmissions).toHaveBeenCalledWith(123);
    expect(mockGetUser).toHaveBeenCalledWith({id: 999});
    expect(category).toBe("some data");
    expect(emissionsCalculator.calculateCategoryAmount).toHaveBeenCalledWith(
      "some categories",
      "user data values"
    );
  });

  it("if the user id is not supplied we look up the standard user", async () => {
    const mockGetUserByName = jest.fn(() => {
      return {dataValues: "STANDARD user data values"};
    });
    await Category.amount(
      {id: 123},
      {},
      {
        dataSources: {
          climateData: {
            getCategoryWithChildrenAndEmissions: () => "some categories",
          },
          users: {
            getUserByName: mockGetUserByName,
          },
        },
      },
      null
    );
    expect(mockGetUserByName).toHaveBeenCalledWith("AVERAGE JOE");
  });

  it("if the user does not exist we look up the standard user", async () => {
    const mockGetUser = jest.fn(() => {
      return undefined;
    });
    const mockGetUserByName = jest.fn(() => {
      return {dataValues: "STANDARD user data values"};
    });
    await Category.amount(
      {id: 123},
      {userId: 999},
      {
        dataSources: {
          climateData: {
            getCategoryWithChildrenAndEmissions: () => "some categories",
          },
          users: {
            getUser: mockGetUser,
            getUserByName: mockGetUserByName,
          },
        },
      },
      null
    );
    expect(mockGetUserByName).toHaveBeenCalledWith("AVERAGE JOE");
  });
});
