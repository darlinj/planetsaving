const emissionsCalculator = require("./emissions_calculator");

describe("the emissions calculation", () => {
  it("working out the amount for a single single emission", async () => {
    const emissions = [{dataValues: {totalCarbonEmited: 10}}];
    const totalEmissions =
      emissionsCalculator.calculateEmissionsTotal(emissions);
    expect(totalEmissions).toEqual(10);
  });

  it("working out the amount for multiple emissions", async () => {
    const emissions = [
      {dataValues: {totalCarbonEmited: 5}},
      {dataValues: {totalCarbonEmited: 10}},
    ];
    const totalEmissions =
      emissionsCalculator.calculateEmissionsTotal(emissions);
    expect(totalEmissions).toEqual(15);
  });

  it("can use the user info if that is available", () => {
    const emissions = [
      {
        dataValues: {
          totalCarbonEmited: 9,
          calculationIdentifier: "driving_tail_pipe",
        },
      },
      {dataValues: {totalCarbonEmited: 3}},
    ];
    const user = {drivingMilesPerYear: 3000};
    const totalEmissions = emissionsCalculator.calculateEmissionsTotal(
      emissions,
      user
    );
    expect(totalEmissions).toEqual(6);
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
