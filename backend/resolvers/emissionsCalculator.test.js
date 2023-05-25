const emissionsCalculator = require("./emissionsCalculator");

describe("the emissions calculation", () => {
  it("working out the amount for a single single emission", async () => {
    const emissions = [{dataValues: {totalCarbonEmited: 10}}];
    const totalEmissions =
      emissionsCalculator.calculateEmissionsForLeafCategory(emissions);
    expect(totalEmissions).toEqual(10);
  });

  it("working out the amount for multiple emissions", async () => {
    const emissions = [
      {dataValues: {totalCarbonEmited: 5}},
      {dataValues: {totalCarbonEmited: 10}},
    ];
    const totalEmissions =
      emissionsCalculator.calculateEmissionsForLeafCategory(emissions);
    expect(totalEmissions).toEqual(15);
  });

  describe("driving calculations", () => {
    it("calculate the tail pipe emissions for a simple multiplier", () => {
      const emissions = [
        {
          dataValues: {
            calculationIdentifier: "simple_multiplier_by_2",
          },
        },
      ];
      const user = {userValueToMultiply: 10};
      const totalEmissions =
        emissionsCalculator.calculateEmissionsForLeafCategory(emissions, user);
      expect(Math.round(totalEmissions * 100) / 100).toEqual(20);
    });
  });
});

describe("the category calculation", () => {
  it("working out the amount for a single category with a single emission", async () => {
    const category = {
      emissions: [{dataValues: {totalCarbonEmited: 10}}],
      children: [],
    };
    const totalEmissions =
      emissionsCalculator.calculateCategoryAmount(category);
    expect(totalEmissions).toEqual(10);
  });

  it("working out the amount for a single category with multiple emissions", async () => {
    const category = {
      emissions: [
        {dataValues: {totalCarbonEmited: 10}},
        {dataValues: {totalCarbonEmited: 5}},
      ],
      children: [],
    };
    const totalEmissions =
      emissionsCalculator.calculateCategoryAmount(category);
    expect(totalEmissions).toEqual(15);
  });

  it("working out the amount for a category with children with multiple emissions", async () => {
    const category = {
      children: [
        {
          emissions: [
            {dataValues: {totalCarbonEmited: 10}},
            {dataValues: {totalCarbonEmited: 5}},
          ],
        },
        {
          emissions: [
            {dataValues: {totalCarbonEmited: 3}},
            {dataValues: {totalCarbonEmited: 5}},
          ],
        },
      ],
    };
    const totalEmissions =
      emissionsCalculator.calculateCategoryAmount(category);
    expect(totalEmissions).toEqual(23);
  });
});
