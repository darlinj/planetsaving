const emissionsCalculator = require("./emissions_calculator");

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
    it("calculate the tail pipe emissions based on the mileage", () => {
      const emissions = [
        {
          dataValues: {
            calculationIdentifier: "driving_tail_pipe",
          },
        },
      ];
      const user = {drivingMilesPerYear: 10000};
      const totalEmissions =
        emissionsCalculator.calculateEmissionsForLeafCategory(emissions, user);
      expect(Math.round(totalEmissions * 100) / 100).toEqual(2.53);
    });

    it("if the car is electric then there are no tail pipe emisions", () => {
      const emissions = [
        {
          dataValues: {
            totalCarbonEmited: 9,
            calculationIdentifier: "driving_tail_pipe",
          },
        },
      ];
      const user = {drivingMilesPerYear: 3000, carType: "electric"};
      const totalEmissions =
        emissionsCalculator.calculateEmissionsForLeafCategory(emissions, user);
      expect(Math.round(totalEmissions * 100) / 100).toEqual(0.14);
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
